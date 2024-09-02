import { useState } from "react";

export const useSchedulerState = (initialAppointments) => {
  const [data, setData] = useState(initialAppointments);
  const [currentDate, setCurrentDate] = useState("2024-09-02");
  const [visible, setVisible] = useState(false);
  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const onAppointmentMetaChange = ({ data, target }) => {
    setAppointmentMeta({ data, target });
  };

  return {
    data: { value: data, setData },
    currentDate,
    setCurrentDate,
    visible,
    toggleVisibility,
    appointmentMeta,
    onAppointmentMetaChange,
  };
};
