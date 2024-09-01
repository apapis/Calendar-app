import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  MonthView,
  WeekView,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./App.css";
import { appointments } from "./data/appointments";
import { useSchedulerState } from "./hooks/useSchedulerState";
import { useAppointmentChanges } from "./hooks/useAppointmentChanges";

function App() {
  const [currentViewName, setCurrentViewName] = useState("Week");

  const { data, currentDate, setCurrentDate } = useSchedulerState(appointments);

  const {
    addedAppointment,
    changeAddedAppointment,
    appointmentChanges,
    changeAppointmentChanges,
    editingAppointment,
    changeEditingAppointment,
    commitChanges,
  } = useAppointmentChanges(data.setData);

  return (
    <Paper>
      <Scheduler data={data.value} height={700}>
        <ViewState
          defaultCurrentViewName="Week"
          currentViewName={currentViewName}
          onCurrentViewNameChange={setCurrentViewName}
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
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
        <DayView startDayHour={9} endDayHour={19} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
}

export default App;
