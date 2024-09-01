import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./App.css";
import { appointments } from "./data/appointments";
import { useState } from "react";
function App() {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState("2018-06-27");
  const currentDateChange = (newDate) => {
    setCurrentDate(newDate);
  };
  return (
    <Paper>
      <Scheduler data={data} height={660}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <WeekView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}

export default App;
