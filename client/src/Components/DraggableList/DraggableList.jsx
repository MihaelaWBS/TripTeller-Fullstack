import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DraggableList = () => {
  const [activities, setActivities] = useState({});
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
      const items = Array.from(activities[sourceDay]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setActivities({
        ...activities,
        [sourceDay]: items,
      });
    }
  };

  const startEditing = (day, id) => {
    setActivities({
      ...activities,
      [day]: activities[day].map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      ),
    });
  };

  const updateActivity = (event, day, id) => {
    event.preventDefault();
    const { time, content } = event.target.elements;
    setActivities({
      ...activities,
      [day]: activities[day].map((item) =>
        item.id === id
          ? {
              ...item,
              time: time.value,
              content: content.value,
              isEditing: false,
            }
          : item
      ),
    });
  };

  const addActivity = (e) => {
    e.preventDefault();

    const dayKey = newActivity.day.toString();
    const activityWithId = { ...newActivity, id: uuidv4(), isEditing: false };

    setActivities({
      ...activities,
      [dayKey]: activities[dayKey]
        ? [...activities[dayKey], activityWithId]
        : [activityWithId],
    });

    setNewActivity({ day: "", time: "", content: "" });

    // Calculate the time until the activity starts
    const now = new Date();
    const activityTime = new Date();
    activityTime.setHours(newActivity.time.split(":")[0]);
    activityTime.setMinutes(newActivity.time.split(":")[1]);
    const timeUntilActivityStarts = activityTime.getTime() - now.getTime();

    // Subtract 5 minutes (in milliseconds) from the time until the activity starts
    const notificationTime = timeUntilActivityStarts - 5 * 60 * 1000;

    // Set a timer to show a notification 5 minutes before the activity starts
    setTimeout(() => {
      alert(`Activity "${newActivity.content}" is starting in 5 minutes!`);
    }, notificationTime);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const deleteActivity = (day, id) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      [day]: prevActivities[day].filter((activity) => activity.id !== id),
    }));
  };
  return (
    <div className="mx-auto w-full max-w-3xl">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(activities)
          .sort()
          .map(([day, dayActivities], idx) => (
            <Droppable key={day} droppableId={day}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mb-6"
                >
                  <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    <div className="font-bold px-2 bg-pink-300 rounded-3xl col-span-3">{`Day ${day}`}</div>
                  </div>
                  {dayActivities.map((activity, index) => (
                    <Draggable
                      key={activity.id}
                      draggableId={activity.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="grid grid-cols-3 gap-4 items-center p-4 mb-2 bg-transparent rounded-xl"
                        >
                          {activity.isEditing ? (
                            <form
                              onSubmit={(event) =>
                                updateActivity(event, day, activity.id)
                              }
                              className="col-span-3 grid grid-cols-3 gap-4 items-center"
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
                              <span className="font-bold">{activity.time}</span>
                              <div className="col-span-2 flex justify-between">
                                {activity.content}
                                <div>
                                  <button
                                    onClick={() =>
                                      startEditing(day, activity.id)
                                    }
                                    className="bg-orange-500 text-white font-bold py-1 px-2 rounded-full mr-2"
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteActivity(day, activity.id)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
      </DragDropContext>
      <form
        onSubmit={addActivity}
        className="grid grid-cols-3 gap-4 items-center mt-4"
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
