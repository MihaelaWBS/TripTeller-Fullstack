import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../axiosInstance";
import { useItinerary } from "../../Context/ItineraryContext";
const DraggableList = ({ activities, itineraryId }) => {
  const { itinerary } = useItinerary();
  const [editingActivity, setEditingActivity] = useState(null);

  const [myActivities, setMyActivities] = useState(null);
  const [newActivity, setNewActivity] = useState({
    day: "",
    time: "",
    content: "",
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDay = source.droppableId;
    const destDay = destination.droppableId;

    if (sourceDay === destDay) {
      const items = Array.from(myActivities[sourceDay]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setMyActivities({
        ...activities,
        [sourceDay]: items,
      });
    }
  };

  const startEditing = (day, id) => {
    setMyActivities({
      ...myActivities,
      [day]: myActivities[day].map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      ),
    });
  };

  const updateActivity = async (event, day, activityId) => {
    event.preventDefault();
    const { time, content } = event.target.elements;

    const updatedActivity = {
      day,
      time: time.value,
      content: content.value,
    };

    // Ensure the endpoint is correct
    try {
      const response = await axiosInstance.put(
        `/api/activities/${activityId}`, // Corrected endpoint
        updatedActivity
      );

      setMyActivities((prevActivities) => {
        return {
          ...prevActivities,
          [day]: prevActivities[day].map((activity) =>
            activity._id === activityId
              ? { ...activity, time: time.value, content: content.value }
              : activity
          ),
        };
      });
    } catch (error) {
      console.error("Error updating activity:", error);
    }

    setEditingActivity(null);
  };
  const addActivity = async (e) => {
    e.preventDefault();

    const currentItineraryId = itineraryId;
    const newActivityData = { ...newActivity, itineraryId: currentItineraryId };

    try {
      const response = await axiosInstance.post(
        "/api/activities",
        newActivityData
      );

      if (response.status === 200 || response.status === 201) {
        const createdActivity = response.data;

        // Functional update form to ensure you're working with the most up-to-date state
        setMyActivities((currentActivities) => {
          // Clone the current activities to avoid direct mutation
          const updatedActivities = { ...currentActivities };

          // Append the new activity to the correct day, creating a new array if necessary
          const dayActivities = updatedActivities[createdActivity.day] || [];
          updatedActivities[createdActivity.day] = [
            ...dayActivities,
            createdActivity,
          ];

          return updatedActivities;
        });

        // Optionally reset the newActivity state to clear the form
        setNewActivity({ day: "", time: "", content: "" });
      } else {
        console.error("Error adding activity:", response);
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const deleteActivity = async (day, activityId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/activities/${activityId}`
      );

      if (response.status === 200) {
        setMyActivities((prevActivities) => {
          const updatedActivities = { ...prevActivities };
          updatedActivities[day] = updatedActivities[day].filter(
            (activity) => activity._id !== activityId
          );
          return updatedActivities;
        });
      } else {
        console.error("Error deleting activity:", response);
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };
  function groupBy(array, key) {
    return array.reduce((acc, obj) => {
      const category = obj[key];
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(obj);
      return acc;
    }, {});
  }

  useEffect(() => {
    if (activities) {
      const groupedData = groupBy(activities, "day");
      console.log("Activities with ID:", groupedData);

      setMyActivities(groupedData);
    }
  }, [activities]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {myActivities &&
        Object.keys(myActivities)
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => (
            <div key={key} className="mb-6">
              <div className="grid grid-cols-3 gap-4 items-center mb-4">
                <div className="font-bold px-2 border-b-2 border-blue-500 col-span-3 ">{`Day ${key}`}</div>
              </div>
              {myActivities[key]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((activity, index) => (
                  <div
                    key={activity._id}
                    className="grid grid-cols-3 gap-4 items-center p-4 mb-2 bg-transparent rounded-xl dark:text-white"
                  >
                    {editingActivity === activity._id ? (
                      <form
                        onSubmit={(event) => {
                          updateActivity(event, key, activity._id);
                          setEditingActivity(null);
                        }}
                        className="col-span-3 grid grid-cols-3 gap-4 items-center dark:text-black"
                      >
                        <input
                          name="time"
                          defaultValue={activity.time}
                          type="time"
                          required
                          className="p-2 text-lg rounded-lg border"
                        />
                        <input
                          name="content"
                          required
                          defaultValue={activity.content}
                          placeholder="Activity description"
                          className="p-2 text-lg rounded-lg border col-span-2"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                        >
                          Save
                        </button>
                      </form>
                    ) : (
                      <>
                        <span className="font-bold dark:text-white">
                          {activity.time}
                        </span>
                        <div className="col-span-2 flex justify-between">
                          {activity.content}
                          <div>
                            <button
                              onClick={() => setEditingActivity(activity._id)}
                              className="bg-white text-white font-bold py-1 px-2 rounded-full mr-2"
                            >
                              <FontAwesomeIcon icon={faEdit} color="black" />
                            </button>
                            <button
                              onClick={() => deleteActivity(key, activity._id)}
                              className="bg-white  text-white font-bold py-1 px-2 rounded-full"
                            >
                              <FontAwesomeIcon icon={faTrash} color="red" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          ))}
      <div className="flex items dark:text-black">
        <form
          onSubmit={addActivity}
          className="grid grid-cols-2 gap-4 items-center mt-4"
          onChange={handleInputChange}
        >
          <input
            name="day"
            value={newActivity.day}
            onChange={handleInputChange}
            type="number"
            min="1"
            required
            placeholder="Day"
            className="px-4 py-2 text-lg rounded-lg border"
          />
          <input
            name="time"
            type="time"
            required
            value={newActivity.time}
            onChange={handleInputChange}
            className="p-2 text-lg rounded-lg border "
          />
          <input
            name="content"
            required
            placeholder="Activity description"
            value={newActivity.content}
            onChange={handleInputChange}
            className="p-2 text-lg rounded-lg border col-span-2"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full col-span-3"
          >
            Add Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default DraggableList;
