import { useThemeColor } from '@/hooks/useThemeColor'
import { MarketDataPoint } from '@/types/market-data'
import { DashPathEffect } from '@shopify/react-native-skia'
import Checkbox from 'expo-checkbox'
import React, { useState } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { CartesianChart, Line } from 'victory-native'

interface GraphProps {
  dataPoints: MarketDataPoint[]
  containerStyle?: StyleProp<ViewStyle>
}

type YKey = 'open' | 'high' | 'low' | 'close'
const yKeys: YKey[] = ['open', 'high', 'low', 'close']
const displayNames: Record<YKey, string> = {
  open: 'Open',
  high: 'High',
  low: 'Low',
  close: 'Close',
}
const colors: Record<YKey, string> = {
  open: '#0A0A7C',
  high: '#E8618C',
  low: '#22CCB2',
  close: '#7F55E0',
}

export function Graph({ dataPoints, containerStyle }: GraphProps) {
  const backgroundColor = useThemeColor({}, 'primary')
  const [displayed, setDisplayed] = useState<Record<YKey, boolean>>({
    open: true,
    high: true,
    low: true,
    close: true,
  })
  const displayedLines = yKeys.filter((key) => displayed[key])

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <View
          style={[{ backgroundColor }, styles.graphContainer, containerStyle]}
        >
          <CartesianChart<
            Record<keyof MarketDataPoint, number>,
            'timestamp',
            YKey
          >
            data={dataPoints}
            xKey="timestamp"
            yKeys={['open', 'high', 'low', 'close']}
            frame={{
              lineColor: '#00000',
              lineWidth: {
                left: 2,
                bottom: 2,
                right: 0,
                top: 0,
              },
            }}
            padding={8}
            yAxis={[
              {
                labelColor: '#000000',
                labelOffset: 4,
                labelPosition: 'outset',
                lineColor: '#ccc',
                linePathEffect: <DashPathEffect intervals={[10, 10]} />,
                lineWidth: 2,
                tickCount: 5,
                formatYLabel: (label) => label.toFixed(2),
              },
            ]}
          >
            {({ points }) => (
              <React.Fragment>
                {displayedLines.map((key) => (
                  <Line
                    key={key}
                    points={points[key]}
                    color={colors[key]}
                    strokeWidth={3}
                  />
                ))}
              </React.Fragment>
            )}
          </CartesianChart>
        </View>
      </View>
      <View style={styles.controls}>
        <Text style={styles.sectionTitle}>Displayed</Text>
        {yKeys.map((key) => (
          <View style={styles.section} key={key}>
            <Checkbox
              style={styles.checkbox}
              value={displayed[key]}
              onValueChange={() =>
                setDisplayed({ ...displayed, [key]: !displayed[key] })
              }
              color={displayed[key] ? '#0A0A7C' : undefined}
            />
            <Text style={styles.paragraph}>{displayNames[key]}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  paragraph: {
    fontSize: 14,
    fontWeight: 400,
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controls: {
    padding: 16,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
})
