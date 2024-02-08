import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../axiosInstance";
import { useItinerary } from "../../Context/ItineraryContext";
const DraggableList = ({ activities, itineraryId }) => {
  const { itinerary } = useItinerary();
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

  const updateActivity = async (event, day, id) => {
    event.preventDefault();
    const { time, content } = event.target.elements;

    const updatedActivity = {
      time: time.value,
      content: content.value,
      isEditing: false,
    };

    try {
      // Send a PUT request to your server with the updated activity
      const response = await axiosInstance.put(
        `/api/activities/${id}`,
        updatedActivity
      );

      // If the request is successful, update the activity in your local state
      if (response.status === 200) {
        setMyActivities({
          ...myActivities,
          [day]: myActivities[day].map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...updatedActivity,
                }
              : item
          ),
        });
      } else {
        console.error("Error updating activity:", response);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const addActivity = async (e) => {
    e.preventDefault();

    // Access the current itinerary ID from the context
    console.log(itinerary);
    const currentItineraryId = itineraryId; // Adjust this line based on how the itinerary ID is stored

    // Prepare the new activity data, including the itinerary ID
    const newActivityData = { ...newActivity, itineraryId: currentItineraryId };

    try {
      console.log(newActivityData);
      const response = await axiosInstance.post(
        "/api/activities",
        newActivityData
      );

      if (response.status === 200 || response.status === 201) {
        // Assuming the server response includes the newly created activity
        const createdActivity = response.data;

        // Update the activities state with the new activity
        // You might need to adjust this logic based on how you're managing activities state
        setMyActivities((prevActivities) => ({
          ...prevActivities,
          [createdActivity.day]: prevActivities[createdActivity.day]
            ? [...prevActivities[createdActivity.day], createdActivity]
            : [createdActivity],
        }));

        // Reset the form fields
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

  const deleteActivity = (day, id) => {
    setMyActivities((prevActivities) => ({
      ...prevActivities,
      [day]: prevActivities[day].filter((activity) => activity.id !== id),
    }));
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
      console.log("WHAAAAT IS THIS GROUP", groupedData);
      setMyActivities(groupedData); // objects
    }
  }, [activities]);
  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     if (!itineraryId) return; // Skip if no itineraryId is provided
  //     try {
  //       const response = await axiosInstance.get(
  //         `/api/activities/itinerary/${itineraryId}`
  //       );
  //       const fetchedActivities = response.data;
  //       // Process and set activities based on your data structure. Example:
  //       const activitiesByDay = fetchedActivities.reduce((acc, activity) => {
  //         const { day, ...rest } = activity;
  //         acc[day] = acc[day] ? [...acc[day], rest] : [rest];
  //         return acc;
  //       }, {});
  //       setMyActivities(activitiesByDay);
  //     } catch (error) {
  //       console.error("Error fetching activities:", error);
  //     }
  //   };
  //   fetchActivities();
  // }, [itineraryId]);
  // useEffect(() => {
  //   fetchActivities();
  // }, [itineraryId]);
  return (
    <div className="mx-auto w-full max-w-3xl">
      {myActivities &&
        Object.keys(myActivities).map((key) => (
          <div>
            <h2> day{key}</h2>
            {myActivities[key].map((a) => (
              <>
                <p>{a.content}</p>
                <p>{a.time}</p>
              </>
            ))}
          </div>
        ))}

      <form
        onSubmit={addActivity}
        className="grid grid-cols-3 gap-4 items-center mt-4"
        onChange={handleInputChange}
      >
        <input
          name="day"
          value={newActivity.day}
          onChange={handleInputChange}
          type="number"
          min="1"
          required
          className="px-4 py-2 text-lg rounded-lg border"
        />
        <input
          name="time"
          type="time"
          required
          value={newActivity.time}
          onChange={handleInputChange}
          className="p-2 text-lg rounded-lg border"
        />
        <input
          name="content"
          required
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
  );
};

export default DraggableList;
