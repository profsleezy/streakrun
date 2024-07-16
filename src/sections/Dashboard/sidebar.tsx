import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as TOSIcon } from './icon1.svg'; // Adjust the path to your SVG file
import { ReactComponent as DISCIcon } from './icon2.svg'; // Adjust the path to your SVG file

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
  padding: 1rem 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Orbitron', sans-serif; /* Use a tech display font */
`;

const SidebarItem = styled(NavLink)`
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 1.5rem;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 10px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #444;
    transform: scale(1.05);

    svg {
      fill: #FFFFFF; /* Change SVG color on hover */
    }
  }

  svg {
    fill: #F6B203;
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
  margin-top: auto;
  padding-bottom: 1rem;
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem exact to="/">Home</SidebarItem>
      <SidebarItem to="/mines">Mines</SidebarItem>
      <SidebarItem to="/hilo">Hilo</SidebarItem>
      <SidebarItem to="/plinko">Plinko</SidebarItem>
      <LowerSection>
        <IconWrapper as={NavLink} to="/tos">
          <TOSIcon />
        </IconWrapper>
        <IconWrapper as={NavLink} to="/disc">
          <DISCIcon />
        </IconWrapper>
      </LowerSection>
      <GlowEffect />
    </SidebarContainer>
  );
}
