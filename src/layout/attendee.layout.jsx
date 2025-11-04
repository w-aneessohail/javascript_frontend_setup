import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar.component";
import Footer from "../component/footer.component";

const AttendeeLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AttendeeLayout;
