import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header/Header';
import styles from './styles';

const Responses = (props) => {
  return (
    <View style={styles.container}>
      <Header title="Responses" hideCreatePost customButton={FilterButton} />
      <FlatList
        data={[
          {name: 'Ashley'},
          {name: 'Hayden'},
          {name: 'Nikolas'},
          {name: 'Glenn'},
          ...Array(8).fill({name: 'Olie'}),
        ]}
        keyExtractor={(_, idx) => idx}
        renderItem={({item}) => (
          <ResponseItem item={item} navigation={props.navigation} />
        )}
        ListHeaderComponent={ListHeader}
        ListHeaderComponentStyle={{marginBottom: 15}}
        ItemSeparatorComponent={Seperator}
      />
    </View>
  );
};

const ResponseItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ResponseDetails')}
      style={styles.responseItem}>
      <Text style={styles.responseName}>{item.name}</Text>
      <Text style={styles.responseDetail}>Football Coaching</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
        <Text style={styles.locationText}>Royal Tunbridge Wells, Kent</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListHeader = () => {
  return (
    <>
      <Seperator opacity={0.2} />
      <View style={styles.listHeaderStatus}>
        <Text style={styles.totalShowing}>Showing all 72 responses</Text>
        <Text style={styles.lastUpdated}>Updated just now</Text>
      </View>
      <Seperator opacity={0.2} />
    </>
  );
};

const FilterButton = () => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <Icon
        onPress={() => {}}
        type="AntDesign"
        name="filter"
        style={{
          position: 'absolute',
          zIndex: 1,
          color: 'black',
        }}
      />
    </TouchableOpacity>
  );
};

const Seperator = ({opacity = 0.3}) => (
  <View style={{height: 1, backgroundColor: '#C7C9D6', opacity}} />
);

export default Responses;
