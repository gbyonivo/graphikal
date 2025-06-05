import { DISPLAY_NAME, YKEYS } from '@/constants/graph'
import { YKey } from '@/types/market-data-graph'
import Checkbox from 'expo-checkbox'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface GraphControlsProps {
  displayed: Record<YKey, boolean>
  onSetDisplayed: (displayed: Record<YKey, boolean>) => void
  resetZoom: () => void
  // TODO: fix this type, caught here, renderProps would have solved it
  resetZoomDisabled?: boolean
}

export function GraphControls({
  displayed,
  onSetDisplayed,
  resetZoom,
  resetZoomDisabled,
}: GraphControlsProps) {
  return (
    <View style={styles.controls}>
      <View>
        <Text style={styles.sectionTitle}>Displayed</Text>
        {YKEYS.map((key) => (
          <View style={styles.section} key={key}>
            <Checkbox
              style={styles.checkbox}
              value={displayed[key]}
              onValueChange={() =>
                onSetDisplayed({ ...displayed, [key]: !displayed[key] })
              }
              color={displayed[key] ? '#0A0A7C' : undefined}
            />
            <Text style={styles.paragraph}>{DISPLAY_NAME[key]}</Text>
          </View>
        ))}
      </View>
      {/* TODO: change colors for disabled */}
      <TouchableOpacity
        onPress={resetZoom}
        // disabled={resetZoomDisabled}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Reset Zoom</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
  controls: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  button: {
    padding: 12,
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    borderRadius: 18,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
})
