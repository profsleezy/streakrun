import { GameBundle } from 'gamba-react-ui-v2';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const tileAnimation = keyframes`
  0% {
    background-position: -100px 100px;
  }
  100% {
    background-position: 100px -100px;
  }
`;

const StyledGameCard = styled(NavLink)<{$small: boolean, $background: string}>`
  width: 150%;
  max-width: 900px; /* Increased max-width for a larger card */
  aspect-ratio: ${(props) => (props.$small ? '1/.5' : '1/.6')};
  background-size: cover;
  border-radius: 15px; /* Slightly increased border radius */
  color: white;
  text-decoration: none;
  font-size: 28px; /* Increased font size for better readability */
  transition: transform .2s ease;
  display: grid;
  gap: 1rem;
  margin: 0 -100%; /* Adjust negative margin to equally expand left and right */

  
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto; /* Adds space around the card and centers it horizontally */

  &:hover {
    transform: scale(1.03); /* Slightly increased scale on hover */
  }

  /* Animation for background */
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-position: center;
    background-image: url('/stuff.png'); /* Adjust background image URL */
    background-repeat: repeat;
    transition: transform .2s ease, opacity .3s;
    animation: ${tileAnimation} 5s linear infinite;
    opacity: 0;
  }

  /* Styling for main image */
  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* Styling for play button */
  .play {
    font-size: 16px; /* Font size for play button */
    border-radius: 8px; /* Border radius for play button */
    padding: 8px 16px; /* Padding for play button */
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    right: 10px; /* Positioning of play button */
    bottom: 10px; /* Positioning of play button */
    opacity: 0;
    text-transform: uppercase;
    backdrop-filter: blur(20px);
    transition: opacity 0.3s ease;
  }

  /* Hover effect for play button */
  &:hover .play {
    opacity: 1;
  }

  /* Hover effect for background */
  &:hover .background {
    opacity: 0.35;
  }

  /* Outline effect on hover */
  &:hover {
    outline: #9564ff33 solid 5px;
    outline-offset: 0px;
  }
`;

export function GameCard({ game }: { game: GameBundle }) {
  const small = useLocation().pathname !== '/';
  return (
    <StyledGameCard
      to={'/' + game.id}
      $small={small ?? false}
      $background={game.meta?.background || ''}
    >
      <div className="background" />
      <div className="image" style={{ backgroundImage: `url(${game.meta?.image})` }} />
      <div className="play">Play {game.meta?.name}</div>
    </StyledGameCard>
  );
}
