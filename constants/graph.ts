import { YKey } from '@/types/market-data-graph'

export const YKEYS: YKey[] = ['open', 'high', 'low', 'close']
export const DISPLAY_NAME: Record<YKey, string> = {
  open: 'Open',
  high: 'High',
  low: 'Low',
  close: 'Close',
}
export const LINE_COLORS: Record<YKey, string> = {
  open: '#0A0A7C',
  high: '#E8618C',
  low: '#22CCB2',
  close: '#7F55E0',
}
