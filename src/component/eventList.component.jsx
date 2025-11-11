import { useEffect, useState, useCallback } from "react";
import useAxios from "../hook/useAxios.hook";
import { useNavigate } from "react-router-dom";

const EventListComponent = ({ category }) => {
  const { fetchData, loading } = useAxios();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const loadEvents = useCallback(async () => {
    const url = category ? `/events?categoryId=${category.id}` : "/events";
    const result = await fetchData({ url, method: "get" });
    if (result && result.events) {
      setEvents(result.events);
    }
  }, [category, fetchData]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{category ? `${category.name} Events` : "All Events"}</h2>
      </div>

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
                      "/placeholder.svg?height=250&width=400&query=event"
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
