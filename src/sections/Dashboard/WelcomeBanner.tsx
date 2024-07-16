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
  height: 60vh; /* Adjust height as needed */
  overflow: hidden;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    height: 70vh; /* Adjust height for larger screens */
  }

  @media (min-width: 1200px) {
    height: 80vh; /* Adjust height for extra-large screens */
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  border-radius: 20px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#ffffff' : '#cccccc')};
  margin: 0 5px;
  cursor: pointer;
`;

export function WelcomeBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % BannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = index => {
    setCurrentImageIndex(index);
  };

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
      <DotsContainer>
        {BannerImages.map((_, index) => (
          <Dot
            key={index}
            active={index === currentImageIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
    </SlideshowContainer>
  );
}
