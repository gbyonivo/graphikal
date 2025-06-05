export interface MarketDataPoint {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface MarketData {
  symbol: string
  data: MarketDataPoint[]
}

export function isMarketData(data: unknown): data is MarketData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'symbol' in data &&
    'data' in data
  )
}

export function isMarketDataPoint(data: unknown): data is MarketDataPoint {
  return (
    typeof data === 'object' &&
    data !== null &&
    'timestamp' in data &&
    'open' in data &&
    'high' in data &&
    'low' in data &&
    'close' in data &&
    'volume' in data
  )
}
