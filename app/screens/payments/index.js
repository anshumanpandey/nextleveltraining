import React from 'react';
import {ScrollView, FlatList} from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import {Data} from '../home/components/data';
import Cards from './Cards';

const Payments = () => {
  const onClickItem = () => {
    NavigationService.navigate('JobDetails');
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderClosePlus />
      <FlatList
        horizontal={false}
        data={Data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Cards item={item} onClickItem={onClickItem} />}
      />
    </ScrollView>
  );
};

export default Payments;
