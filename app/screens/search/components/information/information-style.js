import Dimension from '../../../../constants/dimensions';
import Colors from '../../../../constants/color';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topContain: {
    width: Dimension.pro100,
  },
  infoContain: {
    backgroundColor: 'white',
    width: Dimension.pro80,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -Dimension.px60,
  },
  orgView: {height: Dimension.px160, backgroundColor: Colors.s_blue},
  user_pic: {
    marginTop: -Dimension.px50,
    height: Dimension.px100,
    width: Dimension.px100,
    borderRadius: Dimension.px50,
  },
  userName: {
    marginTop: Dimension.pro5,
    fontSize: 16,
    color: Colors.s_blue,
    fontWeight: '500',
  },
  ps_star_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  ps_star_point: {
    fontWeight: '700',
    color: '#38A663',
  },
  ps_star_total: {
    // fontWeight: '700',
    color: 'gray',
  },
  rate_miles: {
    marginTop: Dimension.pro2_5,
    width: Dimension.pro100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rate_miles_view: {
    width: Dimension.pro33,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headText: {
    fontSize: 16,
    fontWeight: '400',
  },
  buttonContain: {
    marginTop: Dimension.pro2_5,
    width: Dimension.pro100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button_view: {
    width: Dimension.pro49,
    backgroundColor: Colors.s_blue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  post_comment: {
    alignItems: 'center',
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  btn_text: {
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
    fontWeight: '500',
  },
  tabContain: {
    marginTop: Dimension.pro5,
    width: Dimension.pro100,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  tab1Contain: {
    width: Dimension.pro100,
    borderBottomWidth: 5,
    borderBottomColor: 'rgb(237,237,237)',
  },
  tabContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimension.pro80,
  },
  tab1Container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimension.pro90,
  },
  tabs: {
    padding: 8,
    alignItems: 'center',
    width: Dimension.pro31,
    borderBottomColor: 'rgb(119,71,206)',
  },
  tabs1: {
    padding: 10,
    flexDirection: 'row',
    width: Dimension.pro48,
  },

  tab_text: {
    fontSize: 12,
  },
  icons: {
    alignItems: 'center',
    fontSize: 16,
    color: 'green',
    marginLeft: 10,
  },
  detailContain: {
    flex: 1,
    width: Dimension.pro100,
    backgroundColor: 'white',
    borderBottomWidth: 5,
    borderBottomColor: 'rgb(237,237,237)',
  },
  containers: {
    alignSelf: 'center',
    width: Dimension.pro80,
    paddingVertical: Dimension.pro2_5,
  },
  titleText: {
    fontSize: 14,
    color: Colors.s_blue,
    marginBottom: 6,
  },
  valueText: {
    fontSize: 12,
  },
  expView: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  expImg: {
    height: Dimension.px40,
    width: Dimension.px40,
    borderRadius: Dimension.px20,
  },
  userView: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 17,
  },
  userImg: {
    height: Dimension.px50,
    width: Dimension.px50,
    borderRadius: Dimension.px25,
  },
  whenView: {
    marginTop: '10%',
    width: Dimension.pro85,
    alignSelf: 'center',
  },
  menuContainer: {
    marginTop: 15,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
});
export default styles;
