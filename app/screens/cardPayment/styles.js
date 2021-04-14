import Colors from '../../constants/color'
import {StyleSheet, Dimensions} from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width
const guidelineBaseWidth = 375
export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size

const styles = StyleSheet.create({
  buttonSave: {
    width: '80%',
    backgroundColor: Colors.s_blue,
    borderRadius: scaleSize(25),
    height: scaleSize(50),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: scaleSize(20),
    marginBottom: scaleSize(10),
  },
})
export default styles
