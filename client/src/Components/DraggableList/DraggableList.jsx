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
  return (
    <>
      <div className="flex mx-auto w-full max-w-3xl">
        {/* <form onSubmit={addActivity}>
          <input
            name="day"
            value={newActivity.day}
            onChange={handleInputChange}
            placeholder="Day"
            type="number"
            min="1"
          />
          <input
            name="time"
            type="time"
            value={newActivity.time}
            onChange={handleInputChange}
          />
          <input
            name="content"
            value={newActivity.content}
            onChange={handleInputChange}
            placeholder="Activity description"
          />
          <button type="submit">Add Activity</button>
        </form> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  minWidth: "500px",
                  backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
                  padding: "16px",
                  width: "250px",
                }}
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
                        style={{
                          userSelect: "none",
                          padding: "16px",
                          margin: "0 0 8px 0",
                          minHeight: "50px",
                          backgroundColor: snapshot.isDragging
                            ? "lightgreen"
                            : "grey",
                          color: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <span>Day {activity.day}</span>
                        <span>{activity.time}</span>
                        <span>{activity.content}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <form
                  onSubmit={addActivity}
                  style={{
                    width: "100%",
                    display: "flex",

                    gap: "10px",
                  }}
                >
                  <input
                    name="day"
                    value={newActivity.day}
                    onChange={handleInputChange}
                    placeholder="Day"
                    type="number"
                    min="1"
                    style={{ padding: "10px", fontSize: "16px" }}
                  />
                  <input
                    name="time"
                    type="time"
                    value={newActivity.time}
                    onChange={handleInputChange}
                    style={{ padding: "10px", fontSize: "16px" }}
                  />
                  <input
                    name="content"
                    value={newActivity.content}
                    onChange={handleInputChange}
                    placeholder="Activity description"
                    style={{ padding: "10px", fontSize: "16px" }}
                  />
                  <button
                    type="submit"
                    style={{ padding: "10px", fontSize: "16px" }}
                  >
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
