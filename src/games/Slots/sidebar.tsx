import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import tosIcon from './icon2.svg'; // Adjust the path to your SVG file
import discIcon from './icon1.svg'; // Adjust the path to your SVG file

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100px; /* Adjust width as needed */
  height: 100vh;
  background-color: #131620;
  color: #F6B203;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.5rem 0 3.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Orbitron', sans-serif; /* Use a tech display font */
`;

const SidebarItem = styled(NavLink)`
  font-size: 1rem;
  padding: 8px; /* Reduced padding */
  margin-bottom: 0.5rem; /* Reduced margin-bottom */
  cursor: pointer;
  text-align: center;
  width: 80%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;
  color: #F6B203;
  text-decoration: none;

  &:hover {
    background-color: #444;
    transform: scale(1.05);
    color: #FFFFFF; /* Change text color on hover */
  }

  &.active {
    background-color: #444;
    color: #FFFFFF; /* Active link styling */
  }
`;

const BuyNowItem = styled.a`
  font-size: 1rem;
  padding: 8px; /* Reduced padding */
  margin-bottom: 0.5rem; /* Reduced margin-bottom */
  cursor: pointer;
  text-align: center;
  width: 80%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;
  color: #FFFFFF;
  text-decoration: none;
  background-color: #902EDE; /* Different background color */

  &:hover {
    background-color: #ec1495; /* Change background color on hover */
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 8px; /* Reduced padding */
  margin-bottom: 0.5rem; /* Reduced margin-bottom */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #444;
    transform: scale(1.05);
  }

  img {
    width: 24px; /* Adjust icon size */
    height: 24px; /* Adjust icon size */
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 80%;
  height: 4px;
  background: linear-gradient(45deg, #F6B203, transparent);
  border-radius: 2px;
  box-shadow: 0 0 10px #F6B203, 0 0 20px #F6B203, 0 0 30px #F6B203;
  animation: glowing 1.5s infinite;

  @keyframes glowing {
    0% { box-shadow: 0 0 5px #F6B203; }
    50% { box-shadow: 0 0 20px #F6B203; }
    100% { box-shadow: 0 0 5px #F6B203; }
  }
`;

const LowerSection = styled.div`
  padding-bottom: 1rem;
  margin-top: 50%; /* Added margin-top to separate from top items */
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <BuyNowItem href="https://t.me/streakrun" target="_blank" rel="noopener noreferrer">BUY NOW</BuyNowItem>
      <SidebarItem to="/mines">Mines</SidebarItem>
      <SidebarItem to="/hilo">Hilo</SidebarItem>
      <SidebarItem to="/plinko">Plinko</SidebarItem>
      <SidebarItem to="/crash">Crash</SidebarItem>
      <SidebarItem to="/slots">Slots</SidebarItem>
      <SidebarItem to="/flip">Flip</SidebarItem>
      <SidebarItem to="/Roulette">Roulette</SidebarItem>
      <SidebarItem to="/dice">Dice</SidebarItem>
      <LowerSection>
        <IconWrapper href="https://t.me/streakrun" target="_blank" rel="noopener noreferrer">
          <img src={tosIcon} alt="TOS" />
        </IconWrapper>
        <IconWrapper href="https://x.com/streak_run" target="_blank" rel="noopener noreferrer">
          <img src={discIcon} alt="DISC" />
        </IconWrapper>
      </LowerSection>
      <GlowEffect />
    </SidebarContainer>
  );
}
