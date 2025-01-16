import { useState } from "react";

const ImageSlider = () => {
  const slides = [
    { url: "/images/slider/image1.jpg", title: "Arial" },
    { url: "/images/slider/image2.jpg", title: "Church" },
    { url: "/images/slider/image3.jpg", title: "Couple" },
    { url: "/images/slider/image4.jpg", title: "Reception" },
    { url: "/images/slider/image5.jpg", title: "Just Married" },
  ];

  // Current index state of slides array
  const [currentIndex, setCurrentIndex] = useState(0);

  // Styles objects
  const containerStyles = {
    width: "100%",
    height: "50vh",
    margin: "0 auto",
  };

  const sliderStyles = {
    position: "relative",
    height: "100%",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    fontSize: "4.5rem",
    color: "#fff",
    zIndex: "1",
    cursor: "pointer",
    left: "-5%",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    fontSize: "4.5rem",
    color: "#fff",
    zIndex: "1",
    cursor: "pointer",
    right: "-5%",
  };

  const dotContainerStyles = {
    display: "flex",
    justifyContent: "center",
    margin: ".5rem 0",
  };

  const dotStyles = {
    margin: "0 .5rem",
    fontSize: "2.5rem",
    color: "#fff",
    cursor: "pointer",
  };

  // Slider Functions
  const goToPrevious = () => {
    // conditional for first slide
    const isFirstSlide = currentIndex === 0;
    // calculate new index
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    // set new image
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    // conditional for last slide
    const isLastSlide = currentIndex === slides.length - 1;
    // calculate new index
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    // set new image
    setCurrentIndex(newIndex);
  };

  const goToSlide = slideIndex => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div style={containerStyles}>
      <div style={sliderStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious}>
          ⏴
        </div>
        <div style={rightArrowStyles} onClick={goToNext}>
          ⏵
        </div>
        <div style={slideStyles}></div>
        <div style={dotContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              style={{
                ...dotStyles,
                color: slideIndex === currentIndex ? "#37540a" : "#fff"
              }}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
