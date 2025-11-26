"use client";

import { useEffect, useState } from "react";
import useAxios from "../hook/useAxios.hook";
import { useNavigate } from "react-router-dom";

const EventListComponent = ({ category }) => {
  const { fetchData, loading, error } = useAxios();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      const url = category ? `/events?categoryId=${category.id}` : "/events";
      const result = await fetchData({ url, method: "get" });
      if (result && Array.isArray(result)) {
        setEvents(result);
      } else if (result && result.events) {
        setEvents(result.events);
      }
    };

    loadEvents();
  }, [category]);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{category ? `${category.name} Events` : "All Events"}</h2>
      </div>

      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error loading events:</strong>{" "}
          {typeof error === "string"
            ? error
            : "Failed to load events. Please check the console for details."}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {events.length === 0 ? (
            <div className="col-12 text-center text-muted">
              <p>No events found in this category.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 shadow-sm"
                  onClick={() => handleEventClick(event.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      event.imageUrl ||
                      "https://www.freepik.com/free-photo/concert-crowd-enjoying-music-festival_25567003.htm#fromView=keyword&page=1&position=0&uuid=3e2f3f3e-B7e0-4c6a-8b6d-5f5e3e6f1c2d&query=Concerts"
                    }
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text text-muted small">
                      {event.description?.substring(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="badge bg-primary">
                        {event.price ? `$${event.price}` : "Free"}
                      </span>
                      <small className="text-muted">
                        {new Date(event.eventDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EventListComponent;
