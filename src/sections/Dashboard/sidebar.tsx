// Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';

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

const SidebarItem = styled.div`
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

  ${({ active }) => active && `
    background-color: #444;
    color: #FFFFFF; /* Active link styling */
  `}
`;

export function Sidebar({ setPage }) {
  return (
    <SidebarContainer>
      <SidebarItem onClick={() => setPage('Dashboard')}>Home</SidebarItem>
      <SidebarItem onClick={() => setPage('Mines')}>Games</SidebarItem>
      <SidebarItem onClick={() => setPage('Dice')}>Settings</SidebarItem>
    </SidebarContainer>
  );
}
