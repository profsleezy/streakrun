import styled from 'styled-components'

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px; /* Max width set to 1200px */
  transition: width .25s ease, padding .25s ease;
  margin: 0 auto;
  padding: 20px; /* Fixed padding */
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
`;

export const TosWrapper = styled.div`
  position: relative;
  &:after {
    content: " ";
    background: linear-gradient(180deg, transparent, #15151f);
    height: 50px;
    pointer-events: none;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
`

export const TosInner = styled.div`
  max-height: 400px;
  padding: 10px;
  overflow: auto;
  position: relative;
`
