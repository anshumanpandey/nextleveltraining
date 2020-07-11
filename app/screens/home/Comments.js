import React, {Component} from 'react';
import HeaderWithSearch from '../../components/header/HeaderWithSearch';
import {ScrollView, FlatList, View, TextInput} from 'react-native';
import PostComment from './components/PostComment';
import Comments from './components/Comments';
import {Data} from './components/data';
import styles from './styles.js';
import {Icon} from 'native-base';

class CommentsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible_modal: false,
      itemImagePath: '',
    };
  }
  componentDidMount() {}
  render() {
    const item = {
      id: 1,
      name: 'Jhone James',
      time: '23 Jun 2020 11:30',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting.',
    };
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.home_container}>
          <HeaderWithSearch navigation={this.props.navigation} />
          <PostComment item={item} />
          <FlatList
            horizontal={false}
            style={{marginBottom: 60}}
            data={[
              {
                id: 1,
                name: 'Jhone James',
                time: '23 Jun 2020 11:30',
                description:
                  'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesett.',
              },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => <Comments item={item} />}
          />
        </ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputText}>
            <TextInput
              placeholder="Type your comment"
              style={{fontSize: 14, height: 42}}
            />
          </View>
          <View style={styles.arrow_icon}>
            <Icon
              name="send"
              type="MaterialIcons"
              style={{marginLeft: 6, fontSize: 25, color: 'white'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CommentsScreen;
