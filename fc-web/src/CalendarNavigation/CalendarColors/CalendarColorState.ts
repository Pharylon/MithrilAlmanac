import { CalendarModel, blankModel } from "../../Models/CalendarModel";
import { observable, action } from "mobx";
import CalendarState from "../../State/CalendarState";

export class CalendarColorStore {
  @observable calendar: CalendarModel = blankModel;

  @observable visible: boolean = true;

  @action.bound public hide(){
    this.visible = false;
  }

  @action.bound public show(){
    this.visible = true;
    this.calendar = CalendarState.calendar;
  }
}

const CalendarColorState = new CalendarColorStore();

export default CalendarColorState;
