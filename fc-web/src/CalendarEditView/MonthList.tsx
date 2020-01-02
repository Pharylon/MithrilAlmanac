import React, { CSSProperties } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Month from "../Models/Month";
import MonthEditCard from "./MonthEditCard";
import { observer } from "mobx-react";
import CalendarEditState from "../State/CalendarEditState";

const DragAndDropExample = observer(() => {
  const grid = 3;
  // tslint:disable-next-line:max-line-length
  function getItemStyle(isDragging: boolean, draggableStyle: CSSProperties | undefined): CSSProperties {
    const myStyle: CSSProperties = {
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      margin: `0 0 ${grid}px 0`,

      // change background colour if dragging
      background: isDragging ? "" : "",
      border: isDragging ? "1px solid lightgray" : "",

      // styles we need to apply on draggables
      ...draggableStyle,
    };
    return myStyle;
  }


  const reorder = (list: Month[], startIndex: number, endIndex: number): Month[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const newMonths: Month[] = result.map((x, i) => {
      return {
        ...x,
        position: i + 1,
      };
    });
    return newMonths;
  };

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const myItems: Month[] = reorder(
      CalendarEditState.calendar.months,
      result.source.index,
      result.destination.index,
    );
    if (CalendarEditState.monthEditPosition){
      const myMonth = CalendarEditState.calendar.months.find(x => x.position === CalendarEditState.monthEditPosition);
      if (myMonth){
        const newMonth = myItems.find(x => x.name === myMonth.name);
        if (newMonth){
          CalendarEditState.monthEditPosition = newMonth.position;
        }
      }     
    }
    CalendarEditState.calendar.months = myItems;
  }
  const myMonths = [...CalendarEditState.calendar.months];
  return (
    <div className="month-edit-container">
      <div className="month-edit-title">Months</div>
      <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={snapshot.isDraggingOver ? "month-dd dragging" : "month-dd not-dragging"}
            >
              {myMonths.map((item: Month, index: number) => (
                <Draggable key={item.name} draggableId={item.name} index={index}>
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
                      <MonthEditCard position={item.position} />
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
});

export default DragAndDropExample;
