import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/route/protectedRoute";
import RoleRedirect from "@/route/roleRedirect";
import { RoutePath } from "@/enum/route.enum";

// layouts
import AttendeeLayout from "@/layout/attendee.layout";
import OrganizerLayout from "@/layout/organizer.layout";
import AdminLayout from "@/layout/admin.layout";

// pages
import HomePage from "@/page/home.page";
import EventsPage from "@/page/event.page";
import BookingPage from "@/page/booking.page";
import PaymentPage from "@/page/payment.page";
import AdminDashboardPage from "@/page/adminDashboard.page";
import OrganizerDashboardPage from "@/page/organizerDashboard.page";
import AttendeeDashboardPage from "@/page/attendeeDashboard.page";
import AuthPage from "@/page/auth.page";

// auth features
import LoginFeature from "@/feature/auth/login.feature.auth";
import SignupFeature from "@/feature/auth/signup.feature.auth";
import OtpFeature from "@/feature/auth/otp.feature.auth";
import ForgotPasswordFeature from "@/feature/auth/forgotPassword.feature.auth";
import ResetPasswordFeature from "@/feature/auth/resetPassword.feature.auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RoleRedirect />
      </ProtectedRoute>
    ),
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
    path: RoutePath.HOME,
    element: (
      <ProtectedRoute>
        <AttendeeLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutePath.EVENTS.replace(/^\//, ""), element: <EventsPage /> },
      {
        path: RoutePath.BOOKING.replace(/^\//, ""),
        element: <BookingPage />,
      },
      {
        path: RoutePath.PAYMENT.replace(/^\//, ""),
        element: <PaymentPage />,
      },
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
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer",
        element: (
          <ProtectedRoute>
            <OrganizerLayout>
              <OrganizerDashboardPage />
            </OrganizerLayout>
          </ProtectedRoute>
        ),
      },
      {
        path: "attendee",
        element: (
          <ProtectedRoute>
            <AttendeeLayout>
              <AttendeeDashboardPage />
            </AttendeeLayout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
