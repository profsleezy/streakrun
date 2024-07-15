import React from 'react';
import styled from 'styled-components';
import bannerImage from './premium.png';

const BannerImage = styled.img`
  /* Styles for the image */
  width: 100%;
  max-width: 100%;
  height: 80%;
  max-height: 80%;
  border-radius: 10px; /* Rounded corners */
`;

export function WelcomeBanner() {
  return (
    <BannerImage src={bannerImage} alt="Welcome Banner Image" />
  );
}