import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import { priorityColors } from "../priorityColors";
import PropTypes from "prop-types";

export const Appointment = ({ children, style, ...restProps }) => {
  const { data } = restProps;
  const priorityColor = priorityColors[data.priority] || "#1976d2";

  return (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: priorityColor,
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

Appointment.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  data: PropTypes.shape({
    priority: PropTypes.string,
  }).isRequired,
};

Appointment.defaultProps = {
  children: null,
  style: {},
};
