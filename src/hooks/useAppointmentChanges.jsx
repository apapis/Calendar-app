import { useState } from "react";
import firebaseOperation from "../data/firebaseOperation";

export const useAppointmentChanges = (setData) => {
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);

  const changeAddedAppointment = (appointment) => {
    setAddedAppointment(appointment);
  };

  const changeAppointmentChanges = (changes) => {
    setAppointmentChanges(changes);
  };

  const changeEditingAppointment = (appointment) => {
    setEditingAppointment(appointment);
  };

  const commitChanges = async ({ added, changed, deleted }) => {
    try {
      let newData;

      if (added) {
        const startDate = added.startDate || new Date();
        const endDate =
          added.endDate || new Date(startDate.getTime() + 3600000);
        const newAppointment = {
          title: added.title || "Nowe spotkanie",
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          notes: added.notes || "",
          allDay: added.allDay || false,
          location: added.location || "",
          rRule: added.rRule || "",
        };
        const addedAppointment = await firebaseOperation.addNewAppointment(
          newAppointment
        );
        if (addedAppointment) {
          newData = (prevData) => [...prevData, addedAppointment];
        }
      }

      if (changed) {
        const changedPromises = Object.entries(changed).map(
          async ([id, changes]) => {
            await firebaseOperation.updateAppointment({ id, ...changes });
            return { id, changes };
          }
        );
        const updatedChanges = await Promise.all(changedPromises);
        newData = (prevData) =>
          prevData.map((appointment) => {
            const changeSet = updatedChanges.find(
              (change) => change.id === appointment.id
            );
            return changeSet
              ? { ...appointment, ...changeSet.changes }
              : appointment;
          });
      }

      if (deleted !== undefined) {
        await firebaseOperation.deleteAppointment(deleted);
        newData = (prevData) =>
          prevData.filter((appointment) => appointment.id !== deleted);
      }

      setData((prevData) => {
        if (typeof newData === "function") {
          return newData(prevData);
        }
        return prevData;
      });
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian:", error);
    }
  };

  return {
    addedAppointment,
    changeAddedAppointment,
    appointmentChanges,
    changeAppointmentChanges,
    editingAppointment,
    changeEditingAppointment,
    commitChanges,
  };
};
