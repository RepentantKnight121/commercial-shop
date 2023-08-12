import React, { useState, useEffect } from "react";

const imageArray = [
  "./src/assets/slideShow1.webp",
  "./src/assets/slideShow2.webp",
  "./src/assets/slideShow3.webp",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-4/5 mx-auto h-[900px]">
      {imageArray.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
