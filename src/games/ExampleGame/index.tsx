import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2';
import React from 'react';
import SOUND from './test.mp3';

export default function ExampleGame() {
  const _hue = React.useRef(0);
  const [wager, setWager] = useWagerInput();
  const game = GambaUi.useGame();
  const sound = useSound({ test: SOUND });

  const [prices, setPrices] = React.useState([100]);
  const [referencePrice, setReferencePrice] = React.useState(100);

  // Generate new price
  const generateNewPrice = () => {
    const lastPrice = prices[prices.length - 1];
    const change = (Math.random() - 0.5) * 2;
    return Math.max(0, lastPrice + change);
  };

  // Update prices and reference price
  const updatePrices = () => {
    setPrices(prices => {
      const newPrices = [...prices, generateNewPrice()];
      return newPrices.slice(-50); // Keep last 50 points
    });
    setReferencePrice(prices[prices.length - 1]); // Update reference price
  };

  React.useEffect(() => {
    const interval = setInterval(updatePrices, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  const drawGraph = (ctx, size) => {
    const width = size.width;
    const height = size.height;
    const hue = _hue.current;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `hsla(${hue}, 50%, 10%, 1)`;
    ctx.fillRect(0, 0, width, height);

    // Calculate graph dimensions
    const graphWidth = width;
    const graphHeight = height;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice;

    // Normalize prices and draw the graph
    ctx.strokeStyle = `hsla(${hue}, 75%, 60%, 1)`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const xScale = graphWidth / (prices.length - 1);
    const yScale = graphHeight / priceRange;

    for (let i = 0; i < prices.length - 1; i++) {
      const x0 = i * xScale;
      const y0 = graphHeight - (prices[i] - minPrice) * yScale;
      const x1 = (i + 1) * xScale;
      const y1 = graphHeight - (prices[i + 1] - minPrice) * yScale;

      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
    }

    ctx.stroke();

    // Draw reference line
    const referenceY = graphHeight - (referencePrice - minPrice) * yScale;
    ctx.strokeStyle = `hsla(${hue}, 75%, 90%, 1)`;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // Dashed line
    ctx.beginPath();
    ctx.moveTo(0, referenceY);
    ctx.lineTo(graphWidth, referenceY);
    ctx.stroke();

    // Label the reference line
    ctx.fillStyle = `hsla(${hue}, 75%, 90%, 1)`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '14px Arial';
    ctx.fillText(`Ref Price: ${referencePrice.toFixed(2)}`, graphWidth - 10, referenceY);

    // Draw axes
    ctx.strokeStyle = `hsla(${hue}, 75%, 50%, 1)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, graphHeight);
    ctx.lineTo(graphWidth, graphHeight);
    ctx.stroke();
  };

  const click = () => {
    _hue.current = (_hue.current + 30) % 360;
    sound.play('test', { playbackRate: 0.75 + Math.random() * 0.5 });
  };

  const play = async () => {
    await game.play({
      wager,
      bet: [2, 0],
    });
    const result = await game.result();
    console.log(result);
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            drawGraph(ctx, size);
          }}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={click}>
          Useless button
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>
          Double Or nothing
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  );
}
