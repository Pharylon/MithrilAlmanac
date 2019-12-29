import React, { useState, CSSProperties } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";

interface Item {
  id: string;
  content: string;
}

const DragAndDropExample: React.FC = () => {
  const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));
  const [items, setItems] = useState(getItems(20));
  const grid = 8;
  // tslint:disable-next-line:max-line-length
  function getItemStyle(isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined): CSSProperties {
    const myStyle: CSSProperties = {
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,

      // change background colour if dragging
      background: isDragging ? "lightgreen" : "grey",

      // styles we need to apply on draggables
      ...draggableStyle,
    };
    return myStyle;
  }

  const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});


  const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const myItems: Item[] = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(myItems);
  }


  return (
    <div>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item: Item, index: number) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(dProvided, dSnapshot) => (
                    <div
                      ref={dProvided.innerRef}
                      {...dProvided.draggableProps}
                      {...dProvided.dragHandleProps}
                      style={getItemStyle(
                        dSnapshot.isDragging,
                        dProvided.draggableProps.style,
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropExample;
