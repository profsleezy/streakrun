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
  const [backgroundColor, setBackgroundColor] = useState('hsla(0, 50%, 10%, 1)')
  const [gradientColor, setGradientColor] = useState('hsla(0, 75%, 60%, 0.1)')
  const [lineColor, setLineColor] = useState('hsla(0, 75%, 60%, 1)')
  const [axisColor, setAxisColor] = useState('hsla(0, 75%, 50%, 1)')

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
  }

  const handleMouseMove = (event) => {
    const { offsetX, offsetY } = event.nativeEvent
    const xScale = (size.width - 2 * 60) / (prices.length - 1)
    const yScale = (size.height - 2 * 40) / (Math.max(...prices) - Math.min(...prices))
    
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
            gradient.addColorStop(1, gradientColor.replace(/(\d+%)$/, '0.1')) // Adjusted opacity
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

            // Draw the line with smoothing
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(0, graphHeight - (prices[0] - minPrice) * yScale)
            for (let i = 0; i < prices.length - 1; i++) {
              const x0 = i * xScale
              const y0 = graphHeight - (prices[i] - minPrice) * yScale
              const x1 = (i + 1) * xScale
              const y1 = graphHeight - (prices[i + 1] - minPrice) * yScale
              ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
            }
            ctx.stroke()

            // Highlight nearest point
            if (highlightedIndex !== null) {
              ctx.strokeStyle = 'hsla(0, 0%, 100%, 0.7)'
              ctx.lineWidth = 2
              ctx.beginPath()
              const x = highlightedIndex * xScale
              const y = graphHeight - (prices[highlightedIndex] - minPrice) * yScale
              ctx.arc(x, y, 5, 0, 2 * Math.PI)
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
            ctx.textAlign = 'right'
            ctx.font = '12px Arial'
            for (let i = 0; i <= 10; i++) {
              const y = graphHeight - (i / 10) * graphHeight
              const value = Math.round(minPrice + (priceRange * i) / 10)
              ctx.fillText(value, -10, y + marginTop + 4)
            }

            // Draw x-axis labels
            ctx.textAlign = 'center'
            for (let i = 0; i < prices.length; i++) {
              const x = i * xScale
              ctx.fillText(i, x, graphHeight + marginTop + 15)
            }

            ctx.restore()

            // Draw tooltip
            if (tooltip) {
              ctx.fillStyle = 'hsla(0, 0%, 100%, 0.9)'
              ctx.strokeStyle = 'hsla(0, 0%, 0%, 0.5)'
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.rect(tooltip.x, tooltip.y, 80, 30)
              ctx.fill()
              ctx.stroke()
              ctx.fillStyle = 'hsla(0, 0%, 0%, 0.8)'
              ctx.font = '12px Arial'
              ctx.fillText(`Price: ${tooltip.price.toFixed(2)}`, tooltip.x + 5, tooltip.y + 18)
            }
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
        <GambaUi.PlayButton onClick={play}>
          Double Or nothing
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  )
}
