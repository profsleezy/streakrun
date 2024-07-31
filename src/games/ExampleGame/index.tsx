import { GambaUi, TokenValue, useCurrentPool, useSound, useWagerInput } from 'gamba-react-ui-v2'
import { useGamba } from 'gamba-react-v2'
import React from 'react'
import { MAX_PRICE_SHOWN, SOUND_CARD, SOUND_FINISH, SOUND_LOSE, SOUND_PLAY, SOUND_WIN } from './constants'
import { Price, PriceContainer, PricePreview, PricesContainer, Container, Option, Options, Profit } from './styles'
import { Sidebar } from './sidebar'

const BPS_PER_WHOLE = 10000

const randomPrice = () => Math.floor(Math.random() * 100) // Generate a random price between 0 and 99

const generateBetArray = (currentPrice: number, isUp: boolean) => {
  return Array.from({ length: 100 }).map((_, i) => {
    const result = (() => {
      if (isUp) {
        return currentPrice === 0
          ? i > currentPrice ? BigInt(100 * BPS_PER_WHOLE) / BigInt(99 - currentPrice) : BigInt(0)
          : i >= currentPrice ? BigInt(100 * BPS_PER_WHOLE) / BigInt(100 - currentPrice) : BigInt(0)
      }
      return currentPrice === 99
        ? i < currentPrice ? BigInt(100 * BPS_PER_WHOLE) / BigInt(currentPrice) : BigInt(0)
        : i <= currentPrice ? BigInt(100 * BPS_PER_WHOLE) / BigInt(currentPrice + 1) : BigInt(0)
    })()
    return Number(result) / BPS_PER_WHOLE
  })
}

const adjustBetArray = (betArray: number[]) => {
  const maxLength = betArray.length
  const sum = betArray.reduce((acc, val) => acc + val, 0)
  if (sum > maxLength) {
    const maxIndex = betArray.findIndex(val => val === Math.max(...betArray))
    betArray[maxIndex] -= sum - maxLength
    if (betArray[maxIndex] < 0) betArray[maxIndex] = 0
  }
  return betArray
}

export default function DayTradingGame() {
  const game = GambaUi.useGame()
  const gamba = useGamba()
  const pool = useCurrentPool()
  const [prices, setPrices] = React.useState([randomPrice()])
  const [claiming, setClaiming] = React.useState(false)
  const [initialWager, setInitialWager] = useWagerInput()
  const [profit, setProfit] = React.useState(0)
  const currentPrice = prices[prices.length - 1]
  const [option, setOption] = React.useState<'up' | 'down'>(currentPrice > 50 ? 'down' : 'up')
  const [hoveredOption, hoverOption] = React.useState<'up' | 'down'>()

  const addPrice = (value: number) => setPrices((prices) => [...prices, randomPrice()].slice(-MAX_PRICE_SHOWN))

  const sounds = useSound({
    card: SOUND_CARD,
    win: SOUND_WIN,
    lose: SOUND_LOSE,
    play: SOUND_PLAY,
    finish: SOUND_FINISH,
  })

  const betUp = React.useMemo(() => generateBetArray(currentPrice, true), [currentPrice])
  const betDown = React.useMemo(() => generateBetArray(currentPrice, false), [currentPrice])

  const _bet = React.useMemo(() => {
    const _option = hoveredOption ?? option
    if (_option === 'up') return betUp
    if (_option === 'down') return betDown
    return [0]
  }, [betUp, betDown, hoveredOption, option])

  const resetGame = async () => {
    try {
      if (claiming) return
      sounds.play('finish', { playbackRate: .8 })
      setTimeout(() => {
        setProfit(0)
        sounds.play('card')
        addPrice(randomPrice())
        setClaiming(false)
      }, 300)
    } catch {
      setClaiming(false)
    }
  }

  const bet = adjustBetArray(_bet)

  const multiplier = Math.max(...bet)
  const maxWagerForBet = pool.maxPayout / multiplier
  const wager = Math.min(maxWagerForBet, profit || initialWager)

  const play = async () => {
    sounds.play('play')

    await game.play({
      bet,
      wager,
    })

    const result = await game.result()
    addPrice(result.resultIndex)
    sounds.play('card', { playbackRate: .8 })
    const win = result.payout > 0

    setTimeout(() => {
      setProfit(result.payout)
      if (win) {
        sounds.play('win')
      } else {
        sounds.play('lose')
      }
    }, 300)
  }

  return (
    <>
      <Sidebar />
      <GambaUi.Portal target="screen">
        <GambaUi.Responsive>
          <Container $disabled={claiming || gamba.isPlaying}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <PricesContainer>
                {prices.map((price, i) => {
                  const offset = -(prices.length - (i + 1))
                  const xxx = prices.length > 3 ? (i / prices.length) : 1
                  const opacity = Math.min(1, xxx * 3)
                  return (
                    <PriceContainer
                      key={i}
                      style={{
                        transform: `translate(${offset * 30}px, ${-offset * 0}px) rotateZ(-5deg)`,
                        opacity,
                        backgroundColor: price > currentPrice ? 'green' : 'red',
                      }}
                    >
                      <Price>
                        {price}
                      </Price>
                    </PriceContainer>
                  )
                })}
              </PricesContainer>
              <Options>
                <Option
                  selected={option === 'up'}
                  onClick={() => setOption('up')}
                  onMouseEnter={() => hoverOption('up')}
                  onMouseLeave={() => hoverOption(undefined)}
                >
                  <div>📈</div>
                  <div>UP - ({Math.max(...betUp).toFixed(2)}x)</div>
                </Option>
                <Option
                  selected={option === 'down'}
                  onClick={() => setOption('down')}
                  onMouseEnter={() => hoverOption('down')}
                  onMouseLeave={() => hoverOption(undefined)}
                >
                  <div>📉</div>
                  <div>DOWN - ({Math.max(...betDown).toFixed(2)}x)</div>
                </Option>
              </Options>
            </div>
            <PricePreview>
              {Array.from({ length: 100 }).map((_, priceIndex) => {
                const opacity = bet[priceIndex] > 0 ? .9 : .5
                return (
                  <Price key={priceIndex} $small style={{ opacity }}>
                    {priceIndex}
                  </Price>
                )
              })}
            </PricePreview>
            {profit > 0 && (
              <Profit key={profit} onClick={resetGame}>
                <TokenValue amount={profit} /> +{Math.round(profit / initialWager * 100 - 100).toLocaleString()}%
              </Profit>
            )}
          </Container>
        </GambaUi.Responsive>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        {!profit ? (
          <>
            <GambaUi.WagerInput
              value={initialWager}
              onChange={setInitialWager}
            />
            <GambaUi.PlayButton disabled={!option || initialWager > maxWagerForBet} onClick={play}>
              Deal Price
            </GambaUi.PlayButton>
            {initialWager > maxWagerForBet && (
              <GambaUi.Button onClick={() => setInitialWager(maxWagerForBet)}>
                Set max
              </GambaUi.Button>
            )}
          </>
        ) : (
          <>
            <TokenValue amount={wager} />
            <GambaUi.Button disabled={gamba.isPlaying} onClick={resetGame}>
              Finish
            </GambaUi.Button>
            <GambaUi.PlayButton disabled={!option} onClick={play}>
              Deal Price
            </GambaUi.PlayButton>
          </>
        )}
      </GambaUi.Portal>
    </>
  )
}
