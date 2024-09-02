import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const PREFIX = "LocaleSwitcher";

const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`&.${classes.container}`]: {
    display: "flex",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
    justifyContent: "flex-end",
  },
  [`& .${classes.text}`]: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },
}));

export const localizationMessages = {
  "pl-PL": {
    dayView: "Dzień",
    weekView: "Tydzień",
    monthView: "Miesiąc",
    today: "Dziś",
    month: "Miesiąc",
    week: "Tydzień",
    workWeek: "Tydzień roboczy",
    day: "Dzień",
    agenda: "Agenda",
    allDay: "Cały dzień",
    dateNavigator: {
      goToToday: "Idź do dzisiaj",
    },
    viewSwitcher: {
      dayView: "Dzień",
      weekView: "Tydzień",
      monthView: "Miesiąc",
    },
    todayButton: {
      today: "Dziś",
    },
    appointmentForm: {
      detailsLabel: "Szczegóły",
      allDayLabel: "Cały dzień",
      titleLabel: "Tytuł",
      commitCommand: "Zapisz",
      cancelCommand: "Anuluj",
      deleteCommand: "Usuń",
      repeatLabel: "Powtórz",
      notes: "Notatki",
      never: "Nigdy",
      daily: "Codziennie",
      weekly: "Co tydzień",
      monthly: "Co miesiąc",
      yearly: "Co rok",
      repeatEveryLabel: "Powtarzaj co",
      daysLabel: "dni",
      endRepeatLabel: "Koniec powtarzania",
      onLabel: "Dnia",
      afterLabel: "Po",
      occurrencesLabel: "wystąpieniach",
      weeksOnLabel: "tygodni w",
      monthsLabel: "miesięcy",
      ofEveryMonthLabel: "każdego miesiąca",
      theLabel: "",
      firstLabel: "Pierwszy",
      secondLabel: "Drugi",
      thirdLabel: "Trzeci",
      fourthLabel: "Czwarty",
      lastLabel: "Ostatni",
      yearsLabel: "lat",
      ofLabel: "z",
      everyLabel: "Każdy",
      moreInformationLabel: "Więcej informacji",
      notesLabel: "Notatki",
    },
    confirmationDialog: {
      discardButton: "Odrzuć",
      deleteButton: "Usuń",
      cancelButton: "Anuluj",
      confirmDeleteMessage: "Czy na pewno chcesz usunąć to spotkanie?",
      confirmCancelMessage: "Odrzucić niezapisane zmiany?",
    },
    viewState: {
      today: "Dzisiaj",
      month: "Miesiąc",
      week: "Tydzień",
      workWeek: "Tydzień roboczy",
      day: "Dzień",
      agenda: "Agenda",
    },
  },
  "en-US": {
    today: "Today",
    month: "Month",
    week: "Week",
    workWeek: "Work Week",
    day: "Day",
    agenda: "Agenda",
    allDay: "All Day",
    dateNavigator: {
      goToToday: "Go to Today",
    },
    viewSwitcher: {
      switcherItem: "# View",
      switcherItemPlural: "# Views",
    },
    todayButton: {
      today: "Today",
    },
    appointmentForm: {
      detailsLabel: "Details",
      allDayLabel: "All Day",
      titleLabel: "Title",
      commitCommand: "Save",
      cancelCommand: "Cancel",
      deleteCommand: "Delete",
      repeatLabel: "Repeat",
      notes: "Notes",
      never: "Never",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
      repeatEveryLabel: "Repeat every",
      daysLabel: "day(s)",
      endRepeatLabel: "End repeat",
      onLabel: "On",
      afterLabel: "After",
      occurrencesLabel: "occurrence(s)",
      weeksOnLabel: "week(s) on",
      monthsLabel: "month(s)",
      ofEveryMonthLabel: "of every month",
      theLabel: "the",
      firstLabel: "First",
      secondLabel: "Second",
      thirdLabel: "Third",
      fourthLabel: "Fourth",
      lastLabel: "Last",
      yearsLabel: "year(s)",
      ofLabel: "of",
      everyLabel: "Every",
      moreInformationLabel: "More Information",
      notesLabel: "Notes",
    },
    confirmationDialog: {
      discardButton: "Discard",
      deleteButton: "Delete",
      cancelButton: "Cancel",
      confirmDeleteMessage: "Are you sure you want to delete this appointment?",
      confirmCancelMessage: "Discard unsaved changes?",
    },
    viewState: {
      today: "Today",
      month: "Month",
      week: "Week",
      workWeek: "Work Week",
      day: "Day",
      agenda: "Agenda",
    },
    dayView: "Day",
    weekView: "Week",
    monthView: "Month",
  },
};

export const LocaleSwitcher = ({ currentLocale, onLocaleChange }) => {
  const languageLabel = currentLocale === "pl-PL" ? "Język:" : "Language:";

  return (
    <StyledDiv className={classes.container}>
      <div className={classes.text}>{languageLabel}</div>
      <TextField
        select
        variant="standard"
        value={currentLocale}
        onChange={onLocaleChange}
      >
        <MenuItem value="pl-PL">Polski</MenuItem>
        <MenuItem value="en-US">English</MenuItem>
      </TextField>
    </StyledDiv>
  );
};

export const getMessages = (locale) => localizationMessages[locale];
