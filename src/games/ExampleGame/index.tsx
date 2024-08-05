import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React from 'react'
import SOUND from './test.mp3'

export default function ExampleGame() {
  const _hue = React.useRef(0)
  const [wager, setWager] = useWagerInput()
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  const [prices, setPrices] = React.useState([100])
  const [referencePrice, setReferencePrice] = React.useState(100)
  const [animationFrame, setAnimationFrame] = React.useState(null)

  // Function to generate a new price
  const generateNewPrice = () => {
    const lastPrice = prices[prices.length - 1]
    const change = (Math.random() - 0.5) * 2
    return Math.max(0, lastPrice + change)
  }

  // Function to update prices and reference price, and request the next animation frame
  const updatePrices = () => {
    setPrices(prices => {
      const newPrices = [...prices, generateNewPrice()]
      // Keep only the last 50 points to maintain performance
      return newPrices.slice(-50)
    })
    setReferencePrice(generateNewPrice()) // Update reference price
    requestAnimationFrame(drawGraph)
  }

  // Function to draw the graph
  const drawGraph = () => {
    const canvas = document.getElementById('stockCanvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const hue = _hue.current
    const margin = 20
    const referencePrice = _hue.current // Use the hue value as the reference price for simplicity

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

    // Draw reference line
    const referenceY = graphHeight - (referencePrice - minPrice) * yScale
    ctx.strokeStyle = 'hsla(' + hue + ', 75%, 90%, 1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.setLineDash([5, 5]) // Dash pattern for the reference line
    ctx.moveTo(0, referenceY)
    ctx.lineTo(graphWidth, referenceY)
    ctx.stroke()

    // Label the reference line
    ctx.fillStyle = 'hsla(' + hue + ', 75%, 90%, 1)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.font = '14px Arial'
    ctx.fillText('Ref Price: ' + referencePrice.toFixed(2), graphWidth - 10, referenceY)

    // Draw axes
    ctx.strokeStyle = 'hsla(' + hue + ', 75%, 50%, 1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, graphHeight)
    ctx.lineTo(graphWidth, graphHeight)
    ctx.stroke()

    ctx.restore()
  }

  React.useEffect(() => {
    // Start updating prices and drawing the graph
    const frame = requestAnimationFrame(drawGraph)
    setAnimationFrame(frame)
    return () => cancelAnimationFrame(frame)
  }, [])

  React.useEffect(() => {
    // Update prices every second
    const interval = setInterval(updatePrices, 1000)
    return () => clearInterval(interval)
  }, [])

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
        <canvas
          id="stockCanvas"
          width="800"
          height="600"
          style={{ border: '1px solid black' }}
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
