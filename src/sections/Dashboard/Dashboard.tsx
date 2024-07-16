import React from 'react';
import styled from 'styled-components';
import { SlideSection } from '../../components/Slider';
import { GAMES } from '../../games';
import { GameCard } from './GameCard';
import { WelcomeBanner } from './WelcomeBanner';
import { Sidebar } from './sidebar'; // Make sure to import the Sidebar

const Container = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 300px; /* Adjust sidebar width as needed */
  background-color: #131620;
  color: #f6b203;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

export function GameSlider() {
  return (
    <SlideSection>
      {GAMES.map((game) => (
        <div key={game.id} style={{ width: '300px', display: 'flex' }}>
          <GameCard game={game} />
        </div>
      ))}
    </SlideSection>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjust minimum column width */
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
