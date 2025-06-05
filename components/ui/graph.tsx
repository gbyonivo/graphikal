import { LINE_COLORS, YKEYS } from '@/constants/graph'
import { useThemeColor } from '@/hooks/useThemeColor'
import { MarketDataPoint } from '@/types/market-data'
import { YKey } from '@/types/market-data-graph'
import { DashPathEffect } from '@shopify/react-native-skia'
import React, { useRef, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { CartesianChart, Line } from 'victory-native'
import { GraphControls } from './graph-controls'
import { GraphLegend } from './graph-legend'
import { ZoomContainer } from './zoom-container'

interface GraphProps {
  dataPoints: MarketDataPoint[]
  containerStyle?: StyleProp<ViewStyle>
}

export function Graph({ dataPoints, containerStyle }: GraphProps) {
  const backgroundColor = useThemeColor({}, 'primary')
  const [displayed, setDisplayed] = useState<Record<YKey, boolean>>({
    open: true,
    high: true,
    low: true,
    close: true,
  })
  const displayedLines = YKEYS.filter((key) => displayed[key])
  // TODO: fix this type
  const zoomContainerRef = useRef<any>(null)

  return (
    <View style={styles.container}>
      <View style={styles.graphContainer}>
        <ZoomContainer
          containerStyle={[
            { backgroundColor },
            styles.graphContainer,
            containerStyle,
          ]}
          ref={zoomContainerRef}
          render={(scale) => {
            // TODO: debug why is not changing disabled
            return (
              <GraphControls
                displayed={displayed}
                onSetDisplayed={setDisplayed}
                resetZoom={() => zoomContainerRef.current?.resetZoom()}
                resetZoomDisabled={scale.value === 1}
              />
            )
          }}
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
            padding={{
              left: 8,
              bottom: 8,
              right: 8,
              top: 64,
            }}
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
                    color={LINE_COLORS[key]}
                    strokeWidth={3}
                  />
                ))}
              </React.Fragment>
            )}
          </CartesianChart>
        </ZoomContainer>
        <GraphLegend
          displayed={displayedLines}
          containerStyle={styles.legendContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  legendContainer: {
    position: 'absolute',
    top: 32,
  },
})
