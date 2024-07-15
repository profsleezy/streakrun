import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100px; /* Adjust width as needed */
  height: 100vh;
  background-color: #333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled.div`
  font-family: 'Roboto', sans-serif; /* Use a clean, modern font */
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  text-align: center;
  width: 80%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 5px;
  
  &:hover {
    background-color: #444;
    transform: scale(1.05);
  }
`;

const LowerSection = styled.div`
  margin-top: auto;
  padding-bottom: 1rem;
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem>Home</SidebarItem>
      <SidebarItem>Games</SidebarItem>
      <SidebarItem>Settings</SidebarItem>
      <SidebarItem>Profile</SidebarItem>
      <SidebarItem>About</SidebarItem>
      <LowerSection>
        <SidebarItem>Help</SidebarItem>
        <SidebarItem>Logout</SidebarItem>
      </LowerSection>
    </SidebarContainer>
  );
}
