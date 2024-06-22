import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/page/customer/tour-detail/tour-detail.scss";
import { BASE_URL_ADMIN, BASE_URL_USER } from "@/constants";
const TourImagesCarousel = ({ tourId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (tourId) {
          const response = await axios.get(
            `${BASE_URL_USER}/get-all-tour-images/${tourId}`
          );
          setImages(response.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [tourId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      infinite={true}
      autoPlaySpeed={2000}
      autoPlay={true}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {images.map((img, index) => (
        <div key={index} className="image-container">
          <img
            src={`data:image/jpeg;base64,${img.image}`}
            alt={`Tour Image ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default TourImagesCarousel;
