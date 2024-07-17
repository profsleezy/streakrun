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
`;

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '280px', display: 'flex' }}> {/* Slightly decreased the width */}
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr); /* Adjusted to 3 columns for larger cards */
`;

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
        <WelcomeBanner />
        <h2 style={{ marginLeft: '51%' }}>Games</h2>
        <GameGrid />
      </MainContent>
    </>
  );
}
