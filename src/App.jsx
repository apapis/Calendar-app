import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./App.css";
import { appointments } from "./data/appointments";
import { useState } from "react";
import Appointment from "./Appointment/Appointment";
function App() {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState("2018-06-27");
  const [visible, setVisible] = useState(false);
  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  });

  const currentDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onAppointmentMetaChange = ({ data, target }) => {
    setAppointmentMeta({ data, target });
  };

  return (
    <Paper>
      <Scheduler data={data} height={700}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <MonthView />
        <WeekView startDayHour={9} endDayHour={19} />
        <DayView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments
          appointmentComponent={(props) => (
            <Appointment
              {...props}
              toggleVisibility={toggleVisibility}
              onAppointmentMetaChange={onAppointmentMetaChange}
            />
          )}
        />
        <AppointmentTooltip
          showCloseButton
          visible={visible}
          onVisibilityChange={toggleVisibility}
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={onAppointmentMetaChange}
        />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
}

export default App;
