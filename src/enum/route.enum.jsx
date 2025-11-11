export const RoutePath = Object.freeze({
  HOME: "/",
  AUTH: "/auth",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  OTP: "/auth/otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",

  // Role-based layout paths
  ATTENDEE: "/attendee",
  ORGANIZER: "/organizer",
  ADMIN: "/admin",

  EVENTS: "events",
  EVENT_DETAILS: "event/:id",
  BOOKING: "booking/:eventId",
  PAYMENT: "payment/:bookingId",
  PROFILE: "profile",
  EVENT_REVIEWS: "event-reviews",
  ABOUT: "about",
  CONTACT: "contact",
});
