import { format } from 'date-fns'
import {
  isMarketData,
  isMarketDataPoint,
  MarketData,
  MarketDataPoint,
} from '../types/market-data'

// TODO: write tests for this function
export const checkMarketData = (data: unknown): MarketData => {
  if (!isMarketData(data)) {
    throw new Error('Invalid market data')
  }
  // TODO: refactor this to use a map
  const marketDataPoints = data.data.reduce((acc: MarketDataPoint[], item) => {
    if (!isMarketDataPoint(item)) {
      // if you want stop the fun
      // throw new Error('Invalid market data point')
      return acc
    }
    // console.log('hello', format(item.timestamp * 1000, 'yyyy-MM-dd'))
    return [...acc, item]
  }, [])

  return {
    symbol: data.symbol,
    data: marketDataPoints,
  }
}

const dateCache: Record<number, string> = {}

export const getDate = (timestamp: number) => {
  try {
    if (dateCache[timestamp]) {
      return dateCache[timestamp]
    }
    const date = format(timestamp * 1000, 'yyyy-MM-dd')
    dateCache[timestamp] = date
    return date
  } catch (e) {
    return 'Invalid date'
  }
}
