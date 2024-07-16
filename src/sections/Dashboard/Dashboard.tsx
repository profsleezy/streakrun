import React from 'react';
import styled from 'styled-components';
import { SlideSection } from '../../components/Slider';
import { GAMES } from '../../games';
import { GameCard } from './GameCard';
import { WelcomeBanner } from './WelcomeBanner';
import { Sidebar } from './sidebar'; // Make sure to import the Sidebar

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjust minimum card width as needed */
`;

const MainContent = styled.div`
  margin-left: 50px; /* Adjust this value to match the sidebar's width */
  padding: 1rem;
`;

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '1600px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 3rem 3rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
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
        <h2 style={{ textAlign: 'center' }}>Games</h2>
        <GameGrid />
      </MainContent>
    </>
  );
}
