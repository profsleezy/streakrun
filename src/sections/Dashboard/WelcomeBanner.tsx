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

const BannerImage = styled.img`
  /* Styles for the image */
  width: 100%;
  max-width: 100%;
  height: auto; /* Ensures image maintains aspect ratio */
  max-height: 80vh; /* Adjust the maximum height as needed */
  border-radius: 10px; /* Rounded corners */
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
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
    <>
      {BannerImages.map((image, index) => (
        <BannerImage
          key={index}
          src={image}
          alt={`Welcome Banner Image ${index}`}
          show={index === currentImageIndex}
        />
      ))}
    </>
  );
}