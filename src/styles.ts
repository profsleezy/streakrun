import styled from 'styled-components';

export const MainWrapper = styled.div`
  position: relative;
  width: 80%;
  transition: width 0.25s ease, padding 0.25s ease;
  margin: 0 auto;
  padding: 20px; /* Fixed padding */
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;

  @media (min-width: 768px) {
    padding: 30px; /* Adjust padding for larger screens */
  }

  @media (min-width: 1200px) {
    padding: 40px; /* Adjust padding for extra-large screens */
  }
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
