import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios.hook";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { fetchData, loading } = useAxios();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const loadEventDetails = useCallback(async () => {
    const result = await fetchData({ url: `/events/${id}`, method: "get" });
    if (result && result.event) {
      setEvent(result.event);
    }
  }, [id, fetchData]);

  useEffect(() => {
    loadEventDetails();
  }, [loadEventDetails]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
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

  if (!event) {
    return <div className="text-center py-5">Event not found</div>;
  }

  const images = event.images || [event.imageUrl || "/community-event.png"];

  return (
    <div className="container py-4">
      <div
        id="eventCarousel"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image || "/placeholder.svg"}
                className="d-block w-100"
                alt={`${event.title} ${index + 1}`}
                style={{ height: "500px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#eventCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#eventCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </>
        )}
      </div>

      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-3">{event.title}</h1>
          <p className="lead">{event.description}</p>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Event Information</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </li>
                <li className="mb-2">
                  <strong>Location:</strong> {event.location}
                </li>
                <li className="mb-2">
                  <strong>Price:</strong>{" "}
                  {event.price ? `$${event.price}` : "Free"}
                </li>
                <li className="mb-2">
                  <strong>Available Seats:</strong> {event.availableSeats}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: "20px" }}>
            <div className="card-body">
              <h4 className="card-title mb-3">
                {event.price ? `$${event.price}` : "Free"}
              </h4>
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              <p className="text-muted text-center mt-3 mb-0">
                <small>{event.availableSeats} seats available</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
