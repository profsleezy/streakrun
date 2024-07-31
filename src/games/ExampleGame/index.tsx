<GambaUi.Canvas
  render={({ ctx, size }, clock) => {
    const { width, height } = size
    const data = _data.current
    const previousValue = _previousValue.current
    const step = width / (data.length - 1)
    
    // Simulate gradual stock price movement
    const maxRange = height / 2 // Increased range for more noticeable fluctuations
    const slowFactor = 0.1 // Control the rate of change

    // Create smoother fluctuations by generating a small random change
    const randomChange = (Math.random() - 0.5) * slowFactor
    const newValue = Math.max(0, Math.min(height, previousValue + randomChange * maxRange))

    // Update the data with new smoothed values
    data.shift()
    data.push(newValue)
    _previousValue.current = newValue

    // Clear the canvas
    ctx.clearRect(0, 0, width, height)

    // Draw the line
    ctx.strokeStyle = 'hsla(200, 100%, 50%, 1)'
    ctx.lineWidth = 2
    ctx.beginPath()

    ctx.moveTo(0, height - data[0])

    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(i * step, height - data[i])
    }

    ctx.stroke()

    ctx.restore()
  }}
/>
