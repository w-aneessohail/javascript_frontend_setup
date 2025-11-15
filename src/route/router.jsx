import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@/route/protectedRoute";
import { RoutePath } from "@/enum/route.enum";

// layouts
import AttendeeLayout from "@/layout/attendee.layout";
import OrganizerLayout from "@/layout/organizer.layout";
import AdminLayout from "@/layout/admin.layout";

// pages
import HomePage from "@/page/home.page";
import EventsPage from "@/page/event.page";
import EventDetailsPage from "@/page/eventDetails.page";
import BookingPage from "@/page/booking.page";
import PaymentPage from "@/page/payment.page";
import ProfilePage from "@/page/profile.page";
import EventReviewPage from "@/page/eventReview.page";
import AboutPage from "@/page/about.page";
import ContactPage from "@/page/contact.page";
import AuthPage from "@/page/auth.page";

// auth features
import LoginFeature from "@/feature/auth/login.feature.auth";
import SignupFeature from "@/feature/auth/signup.feature.auth";
import OtpFeature from "@/feature/auth/otp.feature.auth";
import ForgotPasswordFeature from "@/feature/auth/forgotPassword.feature.auth";
import ResetPasswordFeature from "@/feature/auth/resetPassword.feature.auth";

import RoleBasedRedirect from "@/route/roleRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedRedirect />,
  },
  {
    path: RoutePath.AUTH,
    element: <AuthPage />,
    children: [
      { index: true, element: <LoginFeature /> },
      { path: "login", element: <LoginFeature /> },
      { path: "register", element: <SignupFeature /> },
      { path: "otp", element: <OtpFeature /> },
      { path: "forgot-password", element: <ForgotPasswordFeature /> },
      { path: "reset-password", element: <ResetPasswordFeature /> },
    ],
  },
  {
    path: RoutePath.ATTENDEE,
    element: (
      <ProtectedRoute>
        <AttendeeLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutePath.EVENTS, element: <EventsPage /> },
      { path: "event/:id", element: <EventDetailsPage /> },
      { path: "booking/:eventId", element: <BookingPage /> },
      { path: "payment/:bookingId", element: <PaymentPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "event-reviews", element: <EventReviewPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: RoutePath.ORGANIZER,
    element: (
      <ProtectedRoute>
        <OrganizerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutePath.EVENTS, element: <EventsPage /> },
      { path: "event/:id", element: <EventDetailsPage /> },
      { path: "booking/:eventId", element: <BookingPage /> },
      { path: "payment/:bookingId", element: <PaymentPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "event-reviews", element: <EventReviewPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: RoutePath.ADMIN,
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutePath.EVENTS, element: <EventsPage /> },
      { path: "event/:id", element: <EventDetailsPage /> },
      { path: "booking/:eventId", element: <BookingPage /> },
      { path: "payment/:bookingId", element: <PaymentPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "event-reviews", element: <EventReviewPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "events",
    element: <ProtectedRoute redirectBasedOnRole={true} rolePath="events" />,
  },
  {
    path: "event-reviews",
    element: (
      <ProtectedRoute redirectBasedOnRole={true} rolePath="event-reviews" />
    ),
  },
  {
    path: "profile",
    element: <ProtectedRoute redirectBasedOnRole={true} rolePath="profile" />,
  },
  {
    path: "about",
    element: <ProtectedRoute redirectBasedOnRole={true} rolePath="about" />,
  },
  {
    path: "contact",
    element: <ProtectedRoute redirectBasedOnRole={true} rolePath="contact" />,
  },
  {
    path: "event/:id",
    element: <ProtectedRoute redirectBasedOnRole={true} rolePath="event/:id" />,
  },
  {
    path: "booking/:eventId",
    element: (
      <ProtectedRoute redirectBasedOnRole={true} rolePath="booking/:eventId" />
    ),
  },
  {
    path: "payment/:bookingId",
    element: (
      <ProtectedRoute
        redirectBasedOnRole={true}
        rolePath="payment/:bookingId"
      />
    ),
  },
]);

export default router;
