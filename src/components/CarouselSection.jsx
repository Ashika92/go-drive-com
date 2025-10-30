import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselSection = () => {
  const cars = [
    { id: 1, image: "https://thumbs.dreamstime.com/b/artistic-silhouette-car-luggage-against-vibrant-sunset-sky-scenic-landscape-stunning-loaded-highlighting-396852614.jpg" },
    { id: 2, image: "https://www.hdcarwallpapers.com/walls/2017_jeep_wrangler_red_rock_edition-HD.jpg" },
    { id: 3, image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/smallimageexter2_5.jpg" },
    { id: 4, image: "https://skift.com/wp-content/uploads/2020/04/AdobeStock_308962487-scaled-e1588326591558.jpeg" },
    { id: 5, image: "https://gomechanic.in/blog/wp-content/uploads/2021/07/Tata-Nexon-Dark-Edition-1000x563.jpg" },
    { id: 6, image: "https://thumbs.dreamstime.com/b/silhouette-children-sitting-car-roof-arms-raised-country-road-pyramid-hill-background-sunset-freedom-joy-silhouette-385683934.jpg" },
    
  ];

  const groupedCars = [];
  for (let i = 0; i < cars.length; i += 2) {
    groupedCars.push(cars.slice(i, i + 2));
  }

  return (
    <div
      className="overflow-hidden shadow-lg w-full"
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        width: "100vw",
      }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3500}
        transitionTime={1000}
        swipeable
        emulateTouch
        stopOnHover
      >
        {groupedCars.map((pair, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-center items-center bg-gradient-to-r from-purple-300 to-cyan-200"
            style={{ height: "auto", minHeight: "250px" }}
          >
            {pair.map((car) => (
              <div
                key={car.id}
                className="w-full sm:w-1/2 h-[250px] sm:h-[400px] md:h-[500px] flex justify-center items-center"
              >
                <img
                  src={car.image}
                  alt="car"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105 rounded-none"
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSection;
