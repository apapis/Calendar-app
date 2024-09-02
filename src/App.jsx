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
import { LocaleSwitcher, getMessages } from "./LocaleSwitcher";

function App() {
  const [currentViewName, setCurrentViewName] = useState("Week");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState("pl-PL");

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

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  const messages = getMessages(locale);

  return (
    <>
      <LocaleSwitcher
        currentLocale={locale}
        onLocaleChange={handleLocaleChange}
      />
      <Paper>
        <Scheduler data={appointments} height={700} locale={locale}>
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
          <MonthView messages={messages} />
          <WeekView startDayHour={9} endDayHour={19} />
          <DayView startDayHour={9} endDayHour={19} />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton messages={messages.todayButton} />
          <AllDayPanel messages={messages} />
          <EditRecurrenceMenu messages={messages.editRecurrenceMenu} />
          <ConfirmationDialog messages={messages.confirmationDialog} />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            showDeleteButton
            messages={messages.appointmentTooltip}
          />
          <AppointmentForm
            messages={messages.appointmentForm}
            readOnly={false}
          />
        </Scheduler>
      </Paper>
    </>
  );
}

export default App;
