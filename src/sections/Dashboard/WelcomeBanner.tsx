import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Welcome = styled.div`
  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  background: linear-gradient(-45deg, #ffb07c, #ff3e88, #2969ff, #ef3cff, #ff3c87);
  background-size: 300% 300%;
  animation: ${fadeIn} 0.5s ease, backgroundGradient 30s ease infinite;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  filter: drop-shadow(0 4px 3px rgba(0,0,0,.07)) drop-shadow(0 2px 2px rgba(0,0,0,.06));

  & img {
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    width: 100px;
    height: 100px;
    top: 0;
    right: 0;
    &:nth-child(1) {animation-delay: 0s;}
    &:nth-child(2) {animation-delay: 1s;}
  }

  & > div {
    padding: 0px;
    filter: drop-shadow(0 4px 3px rgba(0,0,0,.07)) drop-shadow(0 2px 2px rgba(0,0,0,.06));
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 0;
    & > div {
      padding: 40px;
    }
  }
`;

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-top: 0!important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    background: #ffffffdf;
    transition: background .2s ease;
    color: black;
    cursor: pointer;
    &:hover {
      background: white;
    }
  }
`;

const Slide = styled.div`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;

  & > span {
    height: 10px;
    width: 10px;
    margin: 0 5px;
    background-color: ${({ active }) => (active ? '#bbb' : '#717171')};
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
    cursor: pointer;
  }
`;

const WelcomeBanner = () => {
  const slides = [
    {
      title: "Welcome to Gamba v2 👋",
      text: "A fair, simple and decentralized casino on Solana.",
      buttons: [
        { label: "🚀 Add Liquidity", link: "https://v2.gamba.so/" },
        { label: "👨‍💻 Build your own", link: "https://github.com/gamba-labs/gamba" },
        { label: "💬 Discord", link: "https://discord.gg/HSTtFFwR" },
      ],
    },
    {
      title: "Slide 2",
      text: "Content for the second slide.",
      buttons: [
        { label: "Action 1", link: "https://example.com" },
        { label: "Action 2", link: "https://example.com" },
        { label: "Action 3", link: "https://example.com" },
      ],
    },
    // Add more slides as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Welcome>
      {slides.map((slide, index) => (
        <Slide key={index} active={index === currentSlide}>
          <div>
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
          </div>
          <Buttons>
            {slide.buttons.map((button, idx) => (
              <button key={idx} onClick={() => window.open(button.link, '_blank')}>
                {button.label}
              </button>
            ))}
          </Buttons>
        </Slide>
      ))}
      <Dots>
        {slides.map((_, index) => (
          <span key={index} active={index === currentSlide} onClick={() => setCurrentSlide(index)}></span>
        ))}
      </Dots>
    </Welcome>
  );
};

export default WelcomeBanner;
