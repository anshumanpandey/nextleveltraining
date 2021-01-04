import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './../information/information-style';
import LoaderImage from 'react-native-image-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../../../constants/color';

const TeachingCard = ({ data, onPress, selectedItem }) => {
  const normalStyles = { }
  const selectedStyles = { backgroundColor: `${Colors.g_text}50` }

  let currentStyles = normalStyles

  return (
    <View style={styles.detailContain}>
      <View style={styles.containers}>
        {data.map((obj, index) => {
          if (selectedItem && obj.id == selectedItem.id) {
            currentStyles = selectedStyles
          } else {
            currentStyles = {}
          }

          return (
            <TouchableOpacity onPress={() => {
              onPress(obj)
            }}>
              <View style={[styles.expView, currentStyles]}>
                <LoaderImage
                /* TODO: show empty image */
                  source={obj.ImageUrl ? { uri: obj.ImageUrl }: undefined}
                  style={styles.expImg}
                  imageStyle={styles.expImg}
                />
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={[styles.valueText, { fontWeight: '600' }]}>{obj.title}</Text>
                  <Text style={styles.valueText}>{obj.subTitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TeachingCard;
