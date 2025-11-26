import { useState } from "react";
import CategoryComponent from "../component/category.component";
import EventListComponent from "../component/eventList.component";

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {!selectedCategory ? (
        <CategoryComponent onSelectCategory={setSelectedCategory} />
      ) : (
        <div>
          <button
            className="btn btn-link mb-3"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>
          <EventListComponent category={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default EventPage;
