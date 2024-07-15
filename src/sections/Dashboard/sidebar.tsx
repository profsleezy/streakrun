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
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem>Home</SidebarItem>
      <SidebarItem>Games</SidebarItem>
      <SidebarItem>Settings</SidebarItem>
      <SidebarItem>Profile</SidebarItem>
      {/* Add more items as needed */}
    </SidebarContainer>
  );
}
