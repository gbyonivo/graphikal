import {
  isMarketData,
  isMarketDataPoint,
  MarketData,
  MarketDataPoint,
} from '../types/market-data'

export const checkMarketData = (data: unknown): MarketData => {
  if (!isMarketData(data)) {
    throw new Error('Invalid market data')
  }

  const marketDataPoints = data.data.reduce((acc: MarketDataPoint[], item) => {
    if (!isMarketDataPoint(item)) {
      // if you want stop the fun
      // throw new Error('Invalid market data point')
      return acc
    }
    return [...acc, item]
  }, [])

  return {
    symbol: data.symbol,
    data: marketDataPoints,
  }
}
