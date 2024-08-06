import { GambaUi, useSound, useWagerInput } from 'gamba-react-ui-v2'
import React, { useState, useRef, useEffect } from 'react'
import SOUND from './test.mp3'

export default function ExampleGame() {
  const _hue = useRef(0)
  const [wager, setWager] = useWagerInput()
  const game = GambaUi.useGame()
  const sound = useSound({ test: SOUND })

  const [prices, setPrices] = useState([100])
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now())
  const [tooltip, setTooltip] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState('hsla(0, 50%, 10%, 1)') // Initial red color
  const [gradientColor, setGradientColor] = useState('hsla(0, 75%, 60%, 0.1)') // Initial red gradient
  const [lineColor, setLineColor] = useState('hsla(0, 75%, 60%, 1)')
  const [axisColor, setAxisColor] = useState('hsla(0, 75%, 50%, 1)')
  const [lineYPositions, setLineYPositions] = useState([]) // Store Y positions for lines
  const [mode, setMode] = useState('short') // State to handle short/long mode

  const generateNewPrice = () => {
    const lastPrice = prices[prices.length - 1]
    const change = (Math.random() - 0.5) * 2
    return Math.max(0, lastPrice + change)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - lastUpdateTime
      if (elapsed > 1000) {
        setPrices(prices => {
          const newPrices = [...prices, generateNewPrice()]
          // Check for trends
          const length = newPrices.length
          if (length > 2) {
            const lastThree = newPrices.slice(-3)
            const increase = lastThree[0] < lastThree[1] && lastThree[1] < lastThree[2]
            const decrease = lastThree[0] > lastThree[1] && lastThree[1] > lastThree[2]
            if (increase) {
              setBackgroundColor('hsla(120, 50%, 10%, 1)')
              setGradientColor('hsla(120, 75%, 60%, 0.1)')
              setLineColor('hsla(120, 75%, 60%, 1)')
              setAxisColor('hsla(120, 75%, 50%, 1)')
            } else if (decrease) {
              setBackgroundColor('hsla(0, 50%, 10%, 1)')
              setGradientColor('hsla(0, 75%, 60%, 0.1)')
              setLineColor('hsla(0, 75%, 60%, 1)')
              setAxisColor('hsla(0, 75%, 50%, 1)')
            }
          }
          // Keep only the last 50 points to maintain performance
          return newPrices.slice(-50)
        })
        setLastUpdateTime(now)
      }
    }, 100)
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

    // Update the state to show horizontal lines
    const latestPrice = prices[prices.length - 1]
    const offset = mode === 'short' ? 0.3 : -0.3 // Adjust the second line's offset based on the mode
    setLineYPositions([latestPrice, latestPrice + offset])
  }

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    const xScale = (size.width - 2 * 60) / (prices.length - 1)
    const yScale = (size.height - 2 * 40) / (Math.max(...prices) - Math.min(...prices))
    
    // Find the nearest data point
    const index = Math.round((offsetX - 60) / xScale)
    if (index >= 0 && index < prices.length) {
      const y = (size.height - 2 * 40) - (prices[index] - Math.min(...prices)) * yScale
      setTooltip({ x: offsetX + 10, y: y + 20, price: prices[index] })
      setHighlightedIndex(index)
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
    setHighlightedIndex(null)
  }

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            const width = size.width
            const height = size.height
            const marginLeft = 60
            const marginTop = 20
            const marginBottom = 20
            const marginRight = 20
            const graphWidth = width - marginLeft - marginRight
            const graphHeight = height - marginTop - marginBottom
            const maxPrice = Math.max(...prices)
            const minPrice = Math.min(...prices)
            const priceRange = maxPrice - minPrice
            const xScale = graphWidth / (prices.length - 1)
            const yScale = graphHeight / priceRange

            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, width, height)

            ctx.save()
            ctx.translate(marginLeft, marginTop)

            // Draw gradient under the line
            const gradient = ctx.createLinearGradient(0, 0, 0, graphHeight)
            gradient.addColorStop(0, gradientColor)
            gradient.addColorStop(1, gradientColor.replace(/(\d+%)$/, '0')) // Reduce opacity
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.moveTo(0, graphHeight)
            for (let i = 0; i < prices.length; i++) {
              const x = i * xScale
              const y = graphHeight - (prices[i] - minPrice) * yScale
              ctx.lineTo(x, y)
            }
            ctx.lineTo(graphWidth, graphHeight)
            ctx.closePath()
            ctx.fill()

            // Draw the line
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 2
            ctx.beginPath()
            for (let i = 0; i < prices.length - 1; i++) {
              const x0 = i * xScale
              const y0 = graphHeight - (prices[i] - minPrice) * yScale
              const x1 = (i + 1) * xScale
              const y1 = graphHeight - (prices[i + 1] - minPrice) * yScale

              ctx.moveTo(x0, y0)
              ctx.lineTo(x1, y1)
            }
            ctx.stroke()

            // Highlight nearest point
            if (highlightedIndex !== null) {
              ctx.strokeStyle = 'hsla(0, 0%, 100%, 1)' // Contrast color for the highlighted point
              ctx.lineWidth = 2
              ctx.beginPath()
              const x = highlightedIndex * xScale
              const y = graphHeight - (prices[highlightedIndex] - minPrice) * yScale
              ctx.arc(x, y, 4, 0, Math.PI * 2)
              ctx.stroke()
            }

            // Draw axes
            ctx.strokeStyle = axisColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(0, graphHeight)
            ctx.lineTo(graphWidth, graphHeight)
            ctx.stroke()

            // Draw y-axis labels
            ctx.fillStyle = axisColor
            ctx.font = '12px Arial'
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'

            const numLabels = 10
            for (let i = 0; i <= numLabels; i++) {
              const y = graphHeight - (i / numLabels) * graphHeight
              const value = (minPrice + i * (priceRange / numLabels)).toFixed(2)
              ctx.fillText(value, -10, y) // Adjusted x position for visibility
            }

            // Check if the graph touches the bust price and remove lines if true
            if (lineYPositions.length === 2) {
              const graphTouchesBustPrice = prices.some(price => price >= lineYPositions[1])
              if (graphTouchesBustPrice) {
                setLineYPositions([]) // Clear the lines
                return // Exit early if lines should be removed
              }
            }

            // Draw horizontal lines if showLines is true
            if (lineYPositions.length === 2) {
              // Draw the thick dashed white line
              ctx.strokeStyle = 'white' // Line color
              ctx.lineWidth = 4 // Line thickness
              ctx.setLineDash([10, 5]) // Dashed line pattern
              ctx.beginPath()
              const y1 = graphHeight - (lineYPositions[0] - minPrice) * yScale
              ctx.moveTo(0, y1)
              ctx.lineTo(graphWidth, y1)
              ctx.stroke()
              ctx.setLineDash([]) // Reset to solid lines

              // Draw the red line for the bust price
              ctx.strokeStyle = 'red' // Line color
              ctx.lineWidth = 1
              ctx.beginPath()
              const y2 = graphHeight - (lineYPositions[1] - minPrice) * yScale
              ctx.moveTo(0, y2)
              ctx.lineTo(graphWidth, y2)
              ctx.stroke()

              // Label the lines
              ctx.fillStyle = 'white'
              ctx.font = '12px Arial'
              ctx.textAlign = 'left'
              ctx.textBaseline = 'middle'

              // Label for the entry price
              ctx.fillText('Entry Price', graphWidth - 100, y1 - 10)

              // Label for the bust price
              ctx.fillText('Bust Price', graphWidth - 100, y2 - 10)
            }

            // Draw tooltip
            if (tooltip) {
              ctx.fillStyle = 'hsla(0, 0%, 90%, 1)'
              ctx.strokeStyle = 'hsla(0, 0%, 70%, 1)'
              ctx.lineWidth = 1
              ctx.font = '12px Arial'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              
              ctx.beginPath()
              ctx.rect(tooltip.x, tooltip.y - 20, 60, 20)
              ctx.stroke()
              ctx.fill()
              
              ctx.fillStyle = 'black'
              ctx.fillText(`$${tooltip.price.toFixed(2)}`, tooltip.x + 30, tooltip.y - 10)
            }

            ctx.restore()
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <GambaUi.Button onClick={click}>
          Useless button
        </GambaUi.Button>
        <GambaUi.Button onClick={() => setMode(mode === 'short' ? 'long' : 'short')}>
          {mode === 'short' ? 'Long 📈' : 'Short 📉'}
        </GambaUi.Button>
        <GambaUi.PlayButton onClick={play}>
          Double Or Nothing
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}
