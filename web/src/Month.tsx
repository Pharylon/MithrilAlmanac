import React from "react";
import Month from "../../Models/Month";

export default function MonthView(props: {month: Month}) {
return (<div>{props.month.name}</div>);
}
