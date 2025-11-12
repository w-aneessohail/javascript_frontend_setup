"use client";

import { useEffect, useState } from "react";
import useAxios from "../hook/useAxios.hook";

const CategoryComponent = ({ onSelectCategory }) => {
  const { fetchData, loading } = useAxios();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchData({ url: "/categories", method: "get" });
      if (Array.isArray(result)) {
        setCategories(result);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Event Categories</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 col-lg-3">
              <div
                className="card h-100 shadow-sm cursor-pointer"
                onClick={() => onSelectCategory(category)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    category.imageUrl ||
                    "https://www.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_25566947.htm#fromView=keyword&page=1&position=0&uuid=f08f4fb9-f319-4bd9-93da-eebf4f58db54&query=Concerts"
                  }
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{category.name}</h5>
                  {category.description && (
                    <p className="card-text text-muted small">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
