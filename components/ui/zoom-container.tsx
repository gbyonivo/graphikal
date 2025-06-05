import { forwardRef, useImperativeHandle } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

interface ZoomContainerProps {
  children: React.ReactNode
  containerStyle?: StyleProp<ViewStyle>
  render?: (scale: SharedValue<number>) => React.ReactNode
}

export const ZoomContainer = forwardRef(function ZoomContainer(
  { children, containerStyle, render }: ZoomContainerProps,
  ref,
) {
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)

  // TODO: remove later and pass function via render - no time
  useImperativeHandle(ref, () => ({
    resetZoom: () => {
      scale.value = 1
    },
  }))

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale
    })
    .onEnd(() => {
      savedScale.value = scale.value
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View>
      <View style={styles.gestureContainer}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[styles.box, animatedStyle, containerStyle]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
      {render ? render(savedScale) : <View />}
    </View>
  )
})

const styles = StyleSheet.create({
  gestureContainer: {
    overflow: 'hidden',
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
    overflow: 'hidden',
  },
})
