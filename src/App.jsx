import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
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
  AppointmentForm,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./App.css";
import { appointments } from "./data/appointments";
import Appointment from "./Appointment/Appointment";

function App() {
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState("2018-06-27");
  const [visible, setVisible] = useState(false);
  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  });
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const currentDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onAppointmentMetaChange = ({ data, target }) => {
    setAppointmentMeta({ data, target });
  };

  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const changeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let newData = [...prevData];
      if (added) {
        const startingAddedId =
          newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
        newData = [...newData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        newData = newData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        newData = newData.filter((appointment) => appointment.id !== deleted);
      }
      return newData;
    });
  };

  return (
    <Paper>
      <Scheduler data={data} height={700}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <MonthView />
        <WeekView startDayHour={9} endDayHour={19} />
        <DayView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
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
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
}

export default App;
