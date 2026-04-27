import api from "./api";

export const getBookings = async (tripId) => (await api.get(`/bookings/${tripId}`)).data;
export const addBooking = async (tripId, payload) => (await api.post(`/bookings/${tripId}`, payload)).data;
