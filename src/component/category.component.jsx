"use client";

import { useEffect, useState } from "react";
import useAxios from "../hook/useAxios.hook";

const CategoryComponent = ({ onSelectCategory }) => {
  const { fetchData, loading } = useAxios();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchData({ url: "/categories", method: "get" });
      if (result && result.categories) {
        setCategories(result.categories);
      }
    };

    loadCategories();
  }, []); // Empty dependency array - only runs once on mount

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
                    "/placeholder.svg?height=200&width=300&query=category" ||
                    "/placeholder.svg"
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
