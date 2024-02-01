import React, { useEffect, useState } from "react";
import { useSearch } from "../../Context/SearchContext";

const index = () => {
  const {
    fetchAttractions,
    fetchAttractionsByLocation,
    fetchNearbyAttractions,
  } = useSearch();
  const [attractions, setAttractions] = useState(null);
  const [error, setError] = useState(null);

  /*   useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAttractions();
        console.log("Fetched Data:", data); // Check the structure right after fetching
        if (data) {
          setAttractions(data.products || data); // Adjust based on actual structure
        } else {
          console.error("No data returned from fetchAttractions");
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, []); */

  /*   useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAttractionsByLocation();
      setAttractions(response.data.data);
    };
    fetchData();
  }, []); */
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/search`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData); // Log the jsonData to check its structure
        setAttractions(jsonData.results); // Adjust this line based on the actual structure
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAttractions();
  }, []);
  return (
    <>
      <div>
        {error && <p>Error fetching data: {error.message}</p>}
        {attractions &&
          attractions.map((attraction, index) => (
            <div key={index}>
              <h3>{attraction.name}</h3>
              {attraction.related_places.children?.map((child, childIndex) => (
                <div key={childIndex}>
                  <h4>{child.name}</h4>
                  {child.categories.map((category, categoryIndex) => {
                    const imageUrl = `${category.icon.prefix}${category.icon.suffix}`;
                    console.log(imageUrl);
                    return (
                      <div key={categoryIndex}>
                        <p>{category.name}</p>
                        <img src={imageUrl} alt={category.name} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default index;
