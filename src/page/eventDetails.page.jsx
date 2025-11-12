"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios.hook";

const EventDetailsPage = () => {
  const { id } = useParams();
  const { fetchData, loading } = useAxios();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const loadEventDetails = async () => {
      const eventId = Number.parseInt(id, 10);

      if (isNaN(eventId)) {
        setError("Invalid event ID");
        return;
      }

      const result = await fetchData({
        url: `/events/${eventId}`,
        method: "get",
      });

      if (result) {
        setEvent(result);
      } else {
        setError("Failed to load event details");
      }
    };

    loadEventDetails();
  }, []); // Remove fetchData from dependencies to prevent infinite loops

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

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
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
                src={image.imageUrl || image || "/placeholder.svg"}
                className="d-block w-100"
                alt={`${event.title} ${index + 1}`}
                style={{ height: "300px", objectFit: "cover" }}
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
                  <strong>Location:</strong> {event.address}
                </li>
                <li className="mb-2">
                  <strong>Price:</strong>{" "}
                  {event.ticketPrice
                    ? `$${Number.parseFloat(event.ticketPrice).toFixed(2)}`
                    : "Free"}
                </li>
                <li className="mb-2">
                  <strong>Available Seats:</strong> {event.availableTickets}
                </li>
                <li className="mb-2">
                  <strong>Organizer:</strong>{" "}
                  {event.organizer?.organizationName}
                </li>
                <li className="mb-2">
                  <strong>Category:</strong> {event.category?.name}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card" style={{ position: "relative" }}>
            <div className="card-body">
              <h4 className="card-title mb-3">
                {event.ticketPrice
                  ? `$${Number.parseFloat(event.ticketPrice).toFixed(2)}`
                  : "Free"}
              </h4>
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              <p className="text-muted text-center mt-3 mb-0">
                <small>{event.availableTickets} seats available</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
