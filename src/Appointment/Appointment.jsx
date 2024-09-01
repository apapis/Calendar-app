import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";

// Styled IconButton
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.background.default,
  padding: 0,
}));

// Custom Appointment component
const Appointment = ({
  children,
  data,
  toggleVisibility,
  onAppointmentMetaChange,
  ...restProps
}) => (
  <Appointments.Appointment {...restProps}>
    <>
      <StyledIconButton
        onClick={(event) => {
          event.stopPropagation(); // Zatrzymanie propagacji zdarzenia
          toggleVisibility();
          onAppointmentMetaChange({
            target: event.currentTarget.parentElement.parentElement,
            data,
          });
        }}
        size="large"
      >
        <InfoIcon fontSize="small" />
      </StyledIconButton>
      {children}
    </>
  </Appointments.Appointment>
);

export default Appointment;
