import React from 'react';
import styled from 'styled-components';
import { SlideSection } from '../../components/Slider';
import { GAMES } from '../../games';
import { GameCard } from './GameCard';
import { WelcomeBanner } from './WelcomeBanner';
import { Sidebar } from './sidebar'; // Make sure to import the Sidebar

const MainContent = styled.div`
  margin-left: 50px; /* Adjust this value to match the sidebar's width */
  padding: 1rem;
  width: 90%;
  margin: 0 auto; /* Center align the content */
  z-index: 1; /* Ensure main content is above the background */
`;

const BannerContainer = styled.div`
  margin-bottom: 2rem; /* Adjust as needed for spacing */
`;

const GamesHeading = styled.h2`
  margin-left: 50%; /* Adjust the left margin */
  margin-top: 2rem; /* Adjust the top margin */
  margin-bottom: 1rem; /* Adjust the bottom margin */
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr); /* Adjusted to 3 columns for larger cards */
`;

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '280px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  );
}

export function GameGrid() {
  return (
    <Grid>
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Grid>
  );
}

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <MainContent>
        <BannerContainer>
          <WelcomeBanner />
        </BannerContainer>
        <GamesHeading>Games</GamesHeading>
        <GameGrid />
      </MainContent>
    </>
  );
}
