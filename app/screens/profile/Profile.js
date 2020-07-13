import React, {Component} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';
import UserCard from './UserCard';
import TeamMatchCard from './TeamMatchCard';
import TeamUpComingCard from './TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import {pickImage} from '../../helpers/ImagePicker';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      aboutMe: '',
      achievements: '',
      team: [],
      upComing: [],
    };
  }
  render() {
    const {user, aboutMe, achievements, team, upComing} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header toggleDrawer={this.props.toggleDrawer} />
        <ScrollView>
          <View>
            <View style={styles.userView}>
              <View style={{marginTop: 50}}>
                <TouchableOpacity
                  onPress={async () => {
                    const source = await pickImage();
                    this.setState({user: source});
                  }}
                  style={{position: 'relative'}}>
                  <Image
                    source={user ? user : Images.MessiPlayer}
                    style={styles.userImg}
                  />
                  <View style={styles.editView}>
                    <Icon
                      type="EvilIcons"
                      name="pencil"
                      style={{color: 'white', fontSize: 25}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <UserCard
              title={'About Me'}
              data={aboutMe}
              onEditPress={() =>
                NavigationService.navigate('EditInput', {
                  title: 'About Me',
                  data: aboutMe,
                  cb: (aboutMe) => this.setState({aboutMe}),
                })
              }
            />

            <UserCard
              title={'Achievements'}
              data={achievements}
              onEditPress={() =>
                NavigationService.navigate('EditInput', {
                  title: 'Achievements',
                  data: achievements,
                  cb: (achievements) => this.setState({achievements}),
                })
              }
            />

            <TeamMatchCard
              title={'Teams'}
              data={team}
              onEditPress={() =>
                NavigationService.navigate('AddTeam', {
                  title: 'Teams',
                  cb: (team) =>
                    this.setState({team: [...this.state.team, team]}),
                })
              }
            />

            <TeamUpComingCard
              title={'Upcoming Matches'}
              data={upComing}
              onEditPress={() =>
                NavigationService.navigate('UpComingMatch', {
                  title: 'Teams',
                  cb: (upComing) =>
                    this.setState({
                      upComing: [...this.state.upComing, upComing],
                    }),
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;
