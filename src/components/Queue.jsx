// src/components/Queue.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Queue = ({ queue, setQueue }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQueue(items);
  };

  return (
    <div className="queue">
      <h2>Queue</h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="queue">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="droppable-list"
            >
              {queue.map((person, index) => (
                <Draggable key={person} draggableId={person} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-item"
                    >
                      {person}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Queue;
