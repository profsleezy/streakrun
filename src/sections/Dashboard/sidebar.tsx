import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MineIcon } from './mine.svg';



const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 70px;
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
  width: 40px;
  height: 40px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background-color: #444;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: white;
  }
`;

const LowerSection = styled.div`
  margin-top: auto;
  padding-bottom: 1rem;
`;

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarItem>
        <HomeIcon />
      </SidebarItem>
      <SidebarItem>
        <GameIcon />
      </SidebarItem>
      <SidebarItem>
        <SettingsIcon />
      </SidebarItem>
      <SidebarItem>
        <ProfileIcon />
      </SidebarItem>
      <SidebarItem>
        <InfoIcon />
      </SidebarItem>
      <LowerSection>
        <SidebarItem>
          <HelpIcon />
        </SidebarItem>
        <SidebarItem>
          <LogoutIcon />
        </SidebarItem>
      </LowerSection>
    </SidebarContainer>
  );
}
