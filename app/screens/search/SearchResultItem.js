import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../constants/color';
import LoaderImage from 'react-native-image-progress';
import Images from '../../constants/image';

const SearchResultItem = ({ FullName, Address, ProfileImage }) => {
  return (
    <View style={{ backgroundColor: 'white', borderWidth: 1, borderColor: Colors.s_blue, flexDirection: 'row', padding: '3%', borderRadius: 20, marginBottom: '3%' }}>
        <View style={{ marginRight: '3%', justifyContent: 'center'}}>
            <LoaderImage
                imageStyle={{ height: 50, width: 50, borderRadius: 25 }}
                style={{ height: 50, width: 50, borderRadius: 25 }}
                source={ProfileImage ? { uri: ProfileImage }: Images.PlayerPlaceholder}
            />
        </View>
        <View>
            <Text style={{ color: Colors.s_blue, fontSize: 18 }}>{FullName}</Text>
            <Text>sdsd</Text>
            <View style={{ flexDirection: 'row', width: '80%'}}>
                <Icon type="EvilIcons" name="location" />
                <Text>{Address}</Text>
            </View>
        </View>
    </View>
  );
}

export default SearchResultItem;
