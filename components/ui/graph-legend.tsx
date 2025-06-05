import { DISPLAY_NAME, LINE_COLORS } from '@/constants/graph'
import { YKey } from '@/types/market-data-graph'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface GraphLegendProps {
  displayed: YKey[]
  containerStyle?: StyleProp<ViewStyle>
}

export function GraphLegend({ displayed, containerStyle }: GraphLegendProps) {
  return (
    <View style={[styles.legendContainer, containerStyle]}>
      {displayed.map((key) => (
        <View key={key} style={styles.legendItem}>
          <View
            style={[
              styles.legendItemColor,
              { backgroundColor: LINE_COLORS[key] },
            ]}
          />
          <Text>{DISPLAY_NAME[key]}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  legendItemColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})
