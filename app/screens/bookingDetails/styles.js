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
    width: Dimension.pro100,
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
    flexGrow: 1
  },
  dashView: {
    marginTop: 40,
    width: Dimension.pro15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontFilled: {
    marginTop: '25%',
    width: Dimension.px14,
    height: Dimension.px14,
    borderColor: 'rgba(29,181,56,1)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimension.px7,
  },
  innerDontFilled: {
    width: Dimension.px8,
    backgroundColor: 'rgba(29,181,56,1)',
    height: Dimension.px8,
    borderRadius: Dimension.px8,
  },
  triangle: {
    width: 0,
    height: 0,
    marginTop: '2%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderRightWidth: 14,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'white',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  details: {
    width: Dimension.pro80,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    padding: '5%'
  }
});
export default styles;
