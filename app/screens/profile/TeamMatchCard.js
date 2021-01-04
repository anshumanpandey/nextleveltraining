import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import Colors from '../../constants/color.js';
import styles from './styles';
import { Icon } from 'native-base';
import moment from 'moment';
import { useGlobalState } from '../../state/GlobalState.js';

const TeamMatchCard = ({ title, data, disableEdit = false, onEditPress }) => {
  return (
    <View
      style={styles.cardContainer}>
      <TouchableOpacity disabled={disableEdit} onPress={() => onEditPress()}>
        <View
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={styles.titleText}>{title}</Text>
          {!disableEdit && (
            <Icon name='plus' type='EvilIcons' style={{ fontSize: 30, color: Colors.s_blue }} />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: data && data.length <= 0 ? 20 : 10, marginRight: 15 }}>
        {data && data.map(item => {
          return (
            <TouchableOpacity key={item.Id} disabled={disableEdit} onPress={() => onEditPress(item)}>
              <View style={styles.cardContain}>
                <View>
                  <Text style={styles.arrdataText}>{item.title}</Text>
                  <Text style={[styles.dataText, { paddingBottom: 4 }]}>
                    {moment(item.StartDate).format('ll')} {moment(item.EndDate).isBefore(100, "year") ? "Till Date" : `To ${moment(item.EndDate).format('ll')}`}
                  </Text>
                  <Text style={styles.dataText}>
                    {item.TeamName}
                  </Text>
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
          );
        })}
      </View>
    </View>
  );
};

export default TeamMatchCard;
