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
        setPrices(prices => [...prices, generateNewPrice()])
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
            const scale = 3 + Math.cos(clock.time) * .5
            const hue = _hue.current

            ctx.fillStyle = 'hsla(' + hue + ', 50%, 3%, 1)'
            ctx.fillRect(0, 0, size.width, size.height)

            ctx.save()
            ctx.translate(size.width / 2, size.height / 2)

            // Draw the price graph
            ctx.strokeStyle = 'hsla(' + hue + ', 75%, 60%, 1)'
            ctx.lineWidth = 2
            ctx.beginPath()
            const width = size.width
            const height = size.height
            const priceCount = prices.length

            // Normalize prices to fit within the canvas
            const maxPrice = Math.max(...prices)
            const minPrice = Math.min(...prices)
            const priceRange = maxPrice - minPrice

            const xScale = width / (priceCount - 1)
            const yScale = height / priceRange

            // Move to the starting point
            ctx.moveTo(0, height - (prices[0] - minPrice) * yScale)

            // Draw lines between points
            for (let i = 1; i < priceCount; i++) {
              const x = i * xScale
              const y = height - (prices[i] - minPrice) * yScale
              ctx.lineTo(x, y)
            }

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
