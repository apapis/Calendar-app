import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const appointmentsRef = collection(db, "appointments");

const getAllAppointments = async () => {
  try {
    const data = await getDocs(appointmentsRef);
    const appointmentsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("appointmentsData");
    console.log(appointmentsData);
    return appointmentsData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const addNewAppointment = async (newAppointment) => {
  console.log("Firebase");
  console.log(newAppointment);
  const formattedAppointment = {
    ...newAppointment,
    startDate: String(newAppointment.startDate),
    endDate: String(newAppointment.endDate),
  };
  try {
    const docRef = await addDoc(appointmentsRef, {
      title: formattedAppointment.title,
      notes: formattedAppointment.notes,
      startDate: formattedAppointment.startDate,
      endDate: formattedAppointment.endDate,
      allDay: formattedAppointment.allDay,
      location: formattedAppointment.location,
      rRule: formattedAppointment.rRule,
    });
    // Zwrócenie nowego spotkania z identyfikatorem
    return { ...formattedAppointment, id: docRef.id };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteAppointment = async (id) => {
  const appointmentDoc = doc(db, "appointments", id);
  try {
    await deleteDoc(appointmentDoc);
  } catch (err) {
    console.log(err);
  }
};

const updateAppointment = async (appointment) => {
  const appointmentDoc = doc(db, "appointments", appointment.id);
  try {
    await updateDoc(appointmentDoc, appointment);
  } catch (err) {
    console.log(err);
  }
};

const firebaseOperation = {
  getAllAppointments,
  addNewAppointment,
  deleteAppointment,
  updateAppointment,
};

export default firebaseOperation;
