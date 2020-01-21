import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import CalendarEditDay from "./CalendarDayItem";
import "./CalendarEditDay.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const CalendarEditDaysOfWeek = observer(() => {
  function AddDay() {
    if (!EditCalendarState.calendar.daysOfWeek.some(x => x === "")) {
      EditCalendarState.calendar.daysOfWeek.push("");
      EditCalendarState.dayEditPosition = EditCalendarState.calendar.daysOfWeek.length - 1;
    }
  }
  const reorder = (list: string[], startIndex: number, endIndex: number): string[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

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


  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    EditCalendarState.dayEditPosition = undefined;

    const myItems: string[] = reorder(
      EditCalendarState.calendar.daysOfWeek,
      result.source.index,
      result.destination.index,
    );
    EditCalendarState.calendar.daysOfWeek = myItems;
  }
  const myDays = [...EditCalendarState.calendar.daysOfWeek];
  return (
    <div className="days">
      <div className="days-header">
      <h3 className="edit-title">Days of the Week</h3>
      </div>
      <div className="gray-box">
        <DragDropContext
          onDragEnd={(e) => onDragEnd(e)}
          onDragStart={() => EditCalendarState.dayEditPosition = undefined}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={snapshot.isDraggingOver ? "month-dd dragging" : "month-dd not-dragging"}
              >
                {myDays.map((item: string, index: number) => (
                  <Draggable key={item} draggableId={item} index={index}>
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
                        <CalendarEditDay dayIndex={index} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <div>
            <button
              onClick={() => AddDay()}
              className="blue-button">Add Day</button>
          </div>
          <input
            type="checkbox"
            // tslint:disable-next-line:max-line-length
            onChange={() => EditCalendarState.calendar.resetWeekAtMonthStart = !EditCalendarState.calendar.resetWeekAtMonthStart}
            checked={EditCalendarState.calendar.resetWeekAtMonthStart} />
          <label>Reset Weeks at Month Start</label>
        </div>
      </div>
    </div>
  );
});

export default CalendarEditDaysOfWeek;
