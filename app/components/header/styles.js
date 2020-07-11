import Dimension from '../../constants/dimensions.js';
import Colors from '../../constants/color.js';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header_layout: {
    width: Dimension.pro100,
    height: Dimension.px55,
    backgroundColor: Colors.s_yellow,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_item_container: {
    paddingHorizontal: 10,
    width: Dimension.pro100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
  },
  header_menu_icon: {
    fontSize: 35,
    color: 'white',
  },
  profile_user: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginHorizontal: 8,
    marginLeft: 0,
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: Dimension.pro65,
    borderRadius: 25,
  },
  inputText: {
    borderColor: '#DEDEDE',
    padding: 7,
    marginHorizontal: 5,
    width: Dimension.pro85,
  },
});
export default styles;
