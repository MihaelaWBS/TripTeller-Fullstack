import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const DraggableList = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newActivities = Array.from(activities);
    const [reorderedItem] = newActivities.splice(result.source.index, 1);
    newActivities.splice(result.destination.index, 0, reorderedItem);

    setActivities(newActivities);
  };

  const startEditing = (id) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, isEditing: true } : activity
      )
    );
  };
  const addActivity = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (newActivity.content.trim()) {
      setActivities([...activities, { ...newActivity, id: uuidv4() }]);
      setNewActivity({ day: "", time: "", content: "" }); // Reset the new activity input
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const updateActivity = (event, id) => {
    event.preventDefault();

    const { day, time, content } = event.target.elements;

    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              day: day.value,
              time: time.value,
              content: content.value,
              isEditing: false,
            }
          : activity
      )
    );
  };
  return (
    <>
      <div className="flex mx-auto w-full max-w-3xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`min-w-[800px] ${
                  snapshot.isDraggingOver ? "bg-blue-500" : "bg-orange-100"
                } p-4 w-64`}
              >
                {activities.map((activity, index) => (
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
                        className={`select-none p-4 mb-2 min-h-[50px] ${
                          snapshot.isDragging
                            ? "bg-green-300"
                            : "bg-transparent"
                        } text-white flex justify-around`}
                        style={provided.draggableProps.style}
                      >
                        {activity.isEditing ? (
                          <form
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`select-none p-4 mb-2 min-h-[50px] ${
                              snapshot.isDragging
                                ? "bg-green-300"
                                : "bg-gray-500"
                            } ${
                              activity.isEditing ? "text-black" : "text-white"
                            } flex justify-around`}
                            style={provided.draggableProps.style}
                            onSubmit={(event) =>
                              updateActivity(event, activity.id)
                            }
                          >
                            <input
                              name="day"
                              defaultValue={activity.day}
                              type="number"
                              min="1"
                            />
                            <input
                              name="time"
                              type="time"
                              defaultValue={activity.time}
                            />
                            <input
                              name="content"
                              defaultValue={activity.content}
                              placeholder="Activity description"
                            />
                            <button type="submit">Save</button>
                          </form>
                        ) : (
                          <>
                            <span className="px-6 font-bold py-2  bg-red-400 rounded-3xl">
                              Day {activity.day}
                            </span>
                            <span className="text-black">{activity.time}</span>
                            <span className="text-black">
                              {activity.content}
                            </span>
                            <button
                              className="text-black"
                              onClick={() => startEditing(activity.id)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <form
                  onSubmit={addActivity}
                  className="w-full flex items-center justify-center  space-x-2"
                >
                  <input
                    name="day"
                    value={newActivity.day}
                    onChange={handleInputChange}
                    placeholder="Day"
                    type="number"
                    min="1"
                    className="px-4 py-2 text-lg rounded-lg"
                  />

                  <input
                    name="time"
                    type="time"
                    value={newActivity.time}
                    onChange={handleInputChange}
                    className="p-2 text-lg"
                  />
                  <input
                    name="content"
                    value={newActivity.content}
                    onChange={handleInputChange}
                    placeholder="Activity description"
                    className="p-2 text-lg"
                  />
                  <button type="submit" className="p-2 text-lg">
                    Add Activity
                  </button>
                </form>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default DraggableList;
