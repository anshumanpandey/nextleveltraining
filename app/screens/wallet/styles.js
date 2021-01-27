import Dimension from '../../constants/dimensions';
import Colors from '../../constants/color';
import {StyleSheet, Dimensions} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;
export const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  historyItem: {paddingHorizontal: 20, paddingVertical: 20},
  creditSection: {
    backgroundColor: '#f0f2f3',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  itemRow: {flexDirection: 'row', justifyContent: 'space-between'},
  titleText: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
  },
  amountText: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
    color: '#2D7AF0',
  },
  infoText: {
    color: '#80849D',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;
