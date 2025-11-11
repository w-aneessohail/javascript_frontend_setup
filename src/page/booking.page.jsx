import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios.hook";
import { useAuth } from "../context/auth.context";

const BookingPage = () => {
  const { eventId } = useParams();
  const { fetchData, loading } = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const loadEventDetails = useCallback(async () => {
    const result = await fetchData({
      url: `/events/${eventId}`,
      method: "get",
    });
    if (result && result.event) {
      setEvent(result.event);
    }
  }, [eventId, fetchData]);

  useEffect(() => {
    loadEventDetails();
  }, [loadEventDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      eventId: Number.parseInt(eventId),
      numberOfSeats,
    };

    const result = await fetchData({
      url: "/bookings",
      method: "post",
      data: bookingData,
    });

    if (result && result.booking) {
      navigate(`/payment/${result.booking.id}`);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="mb-4">Complete Your Booking</h2>

          {event && (
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">{event.title}</h4>
                <p className="text-muted">
                  {new Date(event.eventDate).toLocaleDateString()} at{" "}
                  {event.location}
                </p>
                <p className="mb-0">
                  <strong>Price per seat:</strong> ${event.price}
                </p>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Your Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${user?.firstName} ${user?.lastName}`}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={user?.email}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Seats</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max={event?.availableSeats || 1}
                    value={numberOfSeats}
                    onChange={(e) =>
                      setNumberOfSeats(Number.parseInt(e.target.value))
                    }
                    required
                  />
                </div>

                <div className="card bg-light mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Price per seat:</span>
                      <span>${event?.price}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Number of seats:</span>
                      <span>{numberOfSeats}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong>${(event?.price || 0) * numberOfSeats}</strong>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
