import Dimension from '../../constants/dimensions';
import Colors from '../../constants/color';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  detailsView: {
    marginTop: 20,
    width: Dimension.pro100,
    flexDirection: 'row',
  },
  userView: {
    alignItems: 'center',
    width: Dimension.pro20,
  },
  userInfoView: {
    width: Dimension.pro75,
  },
  userImg: {
    width: Dimension.px60,
    height: Dimension.px60,
    borderRadius: Dimension.px30,
  },
  headView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    color: Colors.s_blue,
    fontSize: 18,
    fontWeight: '400',
  },
  headText: {
    color: 'gray',
    fontSize: 14,
  },
  headText1: {
    marginTop: 5,
    fontSize: 13,
  },
  orderView: {
    justifyContent: 'space-between',
    marginTop: 15,
  },
  header_menu_icon: {
    fontSize: 25,
    color: Colors.s_blue,
  },
  btn_menu_icon: {
    fontSize: 22,
    marginRight: 7.5,
    color: 'gray',
  },
  btnView: {
    marginTop: 20,
    width: Dimension.pro100,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
  btnTab: {
    width: Dimension.pro33,
    borderWidth: 0.25,
    flexDirection: 'row',
    borderColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  jobStatus: {
    width: Dimension.pro100,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'rgb(244,247,248)',
  },
  dashView: {
    marginTop: 40,
    width: Dimension.pro15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontFilled: {
    width: Dimension.px16,
    // backgroundColor: 'rgba(0,174,36,1)',
    backgroundColor: 'rgba(29,181,56,1)',
    height: Dimension.px16,
    borderRadius: Dimension.px8,
  },
  triangle: {
    width: 0,
    height: 0,
    marginTop: -25,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderBottomWidth: 18,
    borderRightWidth: 9,
    borderLeftWidth: 9,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
  details: {
    width: Dimension.pro80,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.75,
    padding: 12,
  }
});
export default styles;
