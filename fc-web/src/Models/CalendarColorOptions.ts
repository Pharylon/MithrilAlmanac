export default interface ICalendarColorOptions{
  defaultMonthColor: string;
  noEventMonthColor: string;
  defaultEventCategory: IEventCategory;
  eventCategories: ICustomEventCategory[];
}

export interface IEventCategory{
  name: string;
  color: string;
}

export interface ICustomEventCategory extends IEventCategory{
  id: string;
}

export const defaultColorOptions: ICalendarColorOptions = {
  defaultMonthColor: "",
  noEventMonthColor: "",
  defaultEventCategory: {
   name: "",
   color: "", 
  },
  eventCategories: [],
};
