import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import {Data} from '../home/components/data';

const TeamUpComingCard = ({title, data, onEditPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onEditPress()}
      style={styles.cardContainer}>
      <View
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={styles.titleText}>{title}</Text>
        <Icon
          type="EvilIcons"
          name="pencil"
          style={{color: '#0F2F80', fontSize: 25}}
        />
      </View>
      <View style={{marginTop: data && data.length <= 0 ? 20 : 10, marginRight: 15}}>
        <FlatList
          horizontal={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.cardContain}>
              <Text style={[styles.dataText, {paddingBottom: 4}]}>
                {item.startDate}
              </Text>
              <Text style={styles.dataText}>Vs {item.title}</Text>
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TeamUpComingCard;
