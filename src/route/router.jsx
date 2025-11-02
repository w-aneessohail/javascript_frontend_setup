import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import RoleRedirect from "./roleRedirect";
import { RoutePath } from "../enum/route.enum";

// layouts
import AttendeeLayout from "../layout/attendee.layout";
import OrganizerLayout from "../layout/organizer.layout";
import AdminLayout from "../layout/admin.layout";

// pages
import HomePage from "../page/home.page";
import EventsPage from "../page/events.page";
import BookingPage from "../page/booking.page";
import PaymentPage from "../page/payment.page";
import AdminDashboardPage from "../page/adminDashboard.page";
import OrganizerDashboardPage from "../page/organizerDashboard.page";
import AttendeeDashboardPage from "../page/attendeeDashboard.page";
import AuthPage from "../page/auth.page";

// auth features
import LoginFeature from "../feature/auth/login.feature.auth";
import SignupFeature from "../feature/auth/signup.feature.auth";
import OtpFeature from "../feature/auth/otp.feature.auth";
import ForgotPasswordFeature from "../feature/auth/forgotPassword.feature.auth";
import ResetPasswordFeature from "../feature/auth/resetPassword.feature.auth";

const router = createBrowserRouter([
  {
    path: RoutePath.HOME,
    element: <AttendeeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutePath.EVENTS.replace(/^\//, ""), element: <EventsPage /> },
      {
        path: RoutePath.BOOKING.replace(/^\//, ""),
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.PAYMENT.replace(/^\//, ""),
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
    ],
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
    path: RoutePath.DASHBOARD,
    element: (
      <ProtectedRoute>
        <RoleRedirect />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminLayout>
            <AdminDashboardPage />
          </AdminLayout>
        ),
      },
      {
        path: "organizer",
        element: (
          <OrganizerLayout>
            <OrganizerDashboardPage />
          </OrganizerLayout>
        ),
      },
      {
        path: "attendee",
        element: (
          <AttendeeLayout>
            <AttendeeDashboardPage />
          </AttendeeLayout>
        ),
      },
    ],
  },
]);

export default router;
