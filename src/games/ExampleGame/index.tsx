import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'

export default function ExampleGame() {
  const _hue = React.useRef(0)
  const [wager, setWager] = useWagerInput()
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  const [prices, setPrices] = React.useState([100])
  const [lastUpdateTime, setLastUpdateTime] = React.useState(Date.now())

  // Function to generate a new price
  const generateNewPrice = () => {
    const lastPrice = prices[prices.length - 1]
    const change = (Math.random() - 0.5) * 2
    return Math.max(0, lastPrice + change)
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - lastUpdateTime
      if (elapsed > 1000) { // Update every second
        setPrices(prices => {
          const newPrices = [...prices, generateNewPrice()]
          // Keep only the last 50 points to maintain performance
          return newPrices.slice(-50)
        })
        setLastUpdateTime(now)
      }
    }, 100) // Check every 100ms to ensure smooth updating
    return () => clearInterval(interval)
  }, [lastUpdateTime])

  const click = () => {
    _hue.current = (_hue.current + 30) % 360
    sound.play('test', { playbackRate: .75 + Math.random() * .5 })
  }

  const play = async () => {
    await game.play({
      wager,
      bet: [2, 0],
    })
    const result = await game.result()
    console.log(result)
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const hue = _hue.current
            const width = size.width
            const height = size.height
            const margin = 20 // Margin around the graph

            ctx.fillStyle = 'hsla(' + hue + ', 50%, 10%, 1)'
            ctx.fillRect(0, 0, width, height)

            ctx.save()
            ctx.translate(margin, margin)

            // Calculate the graph dimensions
            const graphWidth = width - 2 * margin
            const graphHeight = height - 2 * margin
            const maxPrice = Math.max(...prices)
            const minPrice = Math.min(...prices)
            const priceRange = maxPrice - minPrice

            // Normalize prices and draw the graph
            ctx.strokeStyle = 'hsla(' + hue + ', 75%, 60%, 1)'
            ctx.lineWidth = 2
            ctx.beginPath()

            const xScale = graphWidth / (prices.length - 1)
            const yScale = graphHeight / priceRange

            for (let i = 0; i < prices.length - 1; i++) {
              const x0 = i * xScale
              const y0 = graphHeight - (prices[i] - minPrice) * yScale
              const x1 = (i + 1) * xScale
              const y1 = graphHeight - (prices[i + 1] - minPrice) * yScale

              // Draw a line segment
              ctx.moveTo(x0, y0)
              ctx.lineTo(x1, y1)
            }

            ctx.stroke()

            // Draw axes
            ctx.strokeStyle = 'hsla(' + hue + ', 75%, 50%, 1)'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(0, graphHeight)
            ctx.lineTo(graphWidth, graphHeight)
            ctx.stroke()

            ctx.restore()
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
  )
}
