import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'

interface HeaderProps {
  title: string
  containerStyle?: StyleProp<ViewStyle>
}

const logo = require('../../assets/images/logo.png')

export const Header = ({ title, containerStyle }: HeaderProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image style={styles.image} source={logo} />
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 400,
    fontSize: 32,
  },
  image: {
    width: 51,
    height: 47,
  },
})
