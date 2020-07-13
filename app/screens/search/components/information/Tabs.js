import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './information-style';

const tabs = [
  {id: 1, title: 'INFORMATION'},
  {id: 2, title: 'MEDIA'},
  {id: 3, title: 'REVIEW'},
];
const Tabs = ({selectedTab, activeColor, inActiveColor, onChangeTab}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onChangeTab(index)}
            style={[
              styles.tabs,
              {borderBottomWidth: selectedTab === index ? 1.5 : 0},
            ]}>
            <Text
              style={[
                styles.tab_text,
                {color: selectedTab === index ? activeColor : inActiveColor},
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Tabs;
