import { useEffect, useState } from "react";
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
import { useSchedulerState } from "./hooks/useSchedulerState";
import { useAppointmentChanges } from "./hooks/useAppointmentChanges";
import firebaseOperation from "./data/firebaseOperation";

function App() {
  const [currentViewName, setCurrentViewName] = useState("Week");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { currentDate, setCurrentDate } = useSchedulerState(appointments);

  const {
    addedAppointment,
    changeAddedAppointment,
    appointmentChanges,
    changeAppointmentChanges,
    editingAppointment,
    changeEditingAppointment,
    commitChanges,
  } = useAppointmentChanges(setAppointments);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const data = await firebaseOperation.getAllAppointments();
        const formattedData = data.map((appointment) => ({
          ...appointment,
          startDate: new Date(appointment.startDate),
          endDate: new Date(appointment.endDate),
        }));
        setAppointments(formattedData);
      } catch (error) {
        console.error("Błąd podczas pobierania spotkań:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <Paper>
      <Scheduler data={appointments} height={700}>
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
