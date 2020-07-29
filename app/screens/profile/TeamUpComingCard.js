import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import Colors from '../../constants/color.js';
import moment from 'moment';
import { useGlobalState } from '../../state/GlobalState';

const TeamUpComingCard = ({ title, data, disableEdit, onEditPress }) => {

  return (
    <View
      onPress={() => onEditPress()}
      style={styles.cardContainer}>
      <TouchableOpacity disabled={disableEdit} onPress={() => onEditPress()}>
        <View
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={styles.titleText}>{title}</Text>
          <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: Colors.s_blue }} />
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: data && data.length <= 0 ? 20 : 10, marginRight: 15 }}>
        <FlatList
          horizontal={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity disabled={disableEdit} onPress={() => onEditPress(item)}>
              <View style={styles.cardContain}>
                <View>
                  <Text style={[styles.dataText, { paddingBottom: 4 }]}>
                    {moment(item.MatchDate).format('ll')}
                  </Text>
                  <Text style={styles.dataText}>Vs {item.TeamName}</Text>
                </View>
                {!disableEdit && (
                  <Icon
                    type="EvilIcons"
                    name="pencil"
                    style={{ color: Colors.s_blue, fontSize: 25 }}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TeamUpComingCard;
