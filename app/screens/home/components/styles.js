import Dimension from '../../../constants/dimensions.js';
import Colors from '../../../constants/color.js';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  post_container: {
    width: Dimension.pro100,
  },
  post_card_container: {
    padding: 10,
    flexDirection: 'column',
  },
  comment_card_container: {
    padding: 10,
    flexDirection: 'row',
  },
  post_image_size: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  comment_image_size: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  post_content_view: {
    marginHorizontal: 10,
    width: Dimension.pro85,
    flexDirection: 'row',
  },
  comment_name: {
    backgroundColor: 'rgba(235,235,235, 1)',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  comment_content_view: {
    marginHorizontal: 10,
    width: Dimension.pro70,
    flexDirection: 'row',
  },
  post_title: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  post_title_name: {
    fontSize: 16,
    color: Colors.s_blue,
  },
  post_title_time: {
    marginLeft: 10,
  },
  comment_title_time: {
    marginLeft: 10,
    fontSize: 12,
  },
  post_description: {
    marginTop: 10,
  },
  comment_description: {
    marginTop: 7,
    fontSize: 12,
  },
  post_news_content: {
    marginLeft: 10,
    // width:'90%'
  },
  post_news_image: {
    height: Dimension.px200,
    width: Dimension.deviceWidth - 20,
    borderRadius: 10,
  },
  comment_news_image: {
    height: Dimension.px250,
    width: Dimension.deviceWidth,
  },
  post_news_comment: {
    flexDirection: 'row',
    width: Dimension.deviceWidth - 20,
    marginLeft: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  news_comment: {
    flexDirection: 'row',
    width: Dimension.deviceWidth,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  post_news_like: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  like_reply: {
    width: Dimension.pro80,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  post_tumb_up: {
    fontSize: 20,
    color: Colors.s_blue,
  },
  post_like: {
    marginLeft: 10,
  },
  post_like_reply: {
    marginLeft: 10,
    color: Colors.s_blue,
    fontSize: 10,
  },
  post_comment: {
    fontSize: 20,
    color: Colors.s_blue,
    marginRight: 10,
  },
  more_icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  ps_star_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  ps_star_point: {
    marginRight: 2,
    fontSize: 12,
    color: '#38A663',
  },
  post_news_contents: {
    paddingBottom: 17,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    marginLeft: 12,
    marginRight: 12,
  },
});
export default styles;
