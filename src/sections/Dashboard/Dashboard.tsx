import React from 'react';
import styled from 'styled-components';
import { SlideSection } from '../../components/Slider';
import { GAMES } from '../../games';
import { GameCard } from './GameCard';
import { WelcomeBanner } from './WelcomeBanner';
import { Sidebar } from './sidebar'; // Make sure to import the Sidebar

const MainContent = styled.div
  margin-left: 50px; /* Adjust this value to match the sidebar's width */
  padding: 1rem;
;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '260px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* Adjust the number of columns */
  @media (min-width: 600px) {
    grid-template-columns: repeat(4, minmax(0, 1fr)); /* Adjust for larger screens */
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(5, minmax(0, 1fr)); /* Adjust for even larger screens */
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, minmax(0, 1fr)); /* Adjust for very large screens */
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
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <WelcomeBanner />
        <h2 style={{ textAlign: 'center' }}>Games</h2>
        <GameGrid />
      </MainContent>
    </Container>
  );
}
