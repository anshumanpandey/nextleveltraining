import Dimension from '../../constants/dimensions.js';
import Colors from '../../constants/color.js';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  home_container: {
    // flex: 1,
    // width: '100%',
    height: '100%',
  },
  home_modal_image: {
    height: Dimension.deviceHeight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: Dimension.pro90,
    position: 'absolute',
    bottom: 7,
  },
  inputText: {
    paddingHorizontal: 8,
    borderRadius: 7,
    backgroundColor: 'rgba(235,235,235,1)',
    borderColor: '#DEDEDE',
    width: Dimension.pro85,
  },
  arrow_icon: {
    backgroundColor: Colors.s_blue,
    borderRadius: 5,
    width: 65,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContain: {marginTop: 7, alignItems: 'center'},
  icons: {fontSize: 25},
});
export default styles;
