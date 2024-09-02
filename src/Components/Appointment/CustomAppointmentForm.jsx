import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import localizationMessages from "../../Components/Localization/localizationMessages";
import PropTypes from "prop-types";

export const CustomAppointmentForm = ({
  onFieldChange,
  appointmentData,
  locale,
  ...restProps
}) => {
  const messages = localizationMessages[locale].priority;

  const onPriorityChange = (nextValue) => {
    onFieldChange({ priority: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text={messages.label} type="title" />
      <AppointmentForm.Select
        value={appointmentData.priority || "medium"}
        onValueChange={onPriorityChange}
        availableOptions={[
          { id: "low", text: messages.low },
          { id: "medium", text: messages.medium },
          { id: "high", text: messages.high },
        ]}
      />
    </AppointmentForm.BasicLayout>
  );
};

CustomAppointmentForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  appointmentData: PropTypes.shape({
    priority: PropTypes.string,
  }).isRequired,
  locale: PropTypes.string.isRequired,
};
