import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bannerImage1 from './premium1.png';
import bannerImage2 from './premium2.png';
import bannerImage3 from './premium3.png';

const BannerImages = [
  bannerImage1,
  bannerImage2,
  bannerImage3,
  // Add more images as needed
];

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px; /* Limit maximum width */
  height: 60vh; /* Adjust height as needed */
  max-height: 80vh; /* Limit maximum height */
  overflow: hidden;
  margin: 0 auto; /* Center align horizontally */
`;

const BannerImage = styled.img`
  /* Styles for the image */
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure image covers the container */
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  border-radius: 10px; /* Rounded corners */
`;

export function WelcomeBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SlideshowContainer>
      {BannerImages.map((image, index) => (
        <BannerImage
          key={index}
          src={image}
          alt={`Welcome Banner Image ${index}`}
          show={index === currentImageIndex}
        />
      ))}
    </SlideshowContainer>
  );
}
