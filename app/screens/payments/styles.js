import Dimension from '../../constants/dimensions';
import Colors from '../../constants/color';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containers: {
    width: Dimension.pro100,
  },
  cardView: {
    width: Dimension.pro100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
  },
  header_menu_icon: {
    fontSize: 35,
    color: Colors.s_blue,
  },
  cardImg: {
    marginRight: 10,
    width: Dimension.px40,
    height: Dimension.px25,
  },
  cardTitle: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
  },
});
export default styles;
