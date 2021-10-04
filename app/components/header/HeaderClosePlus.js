import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon, Spinner } from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';

const HeaderClosePlus = ({ isSaveButton, saveOnPress, isLoading = false, onGoBack = null }) => (
  <View style={styles.header_layout}>
    <View style={[styles.header_item_container, { justifyContent: 'space-between' }]}>
      <TouchableOpacity onPress={() => {
        if (onGoBack) {
          onGoBack()
        } else {
          NavigationService.goBack()
        }
      }}>
        <Icon
          name="close"
          type="MaterialIcons"
          color="black"
          style={styles.header_menu_icon}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {isSaveButton ? (
          <>
            {isLoading && <Spinner color="black" style={{ marginRight: '10%' }} />}
            <TouchableOpacity style={{ paddingVertical: Dimension.px10 }} disabled={isLoading} onPress={() => saveOnPress()}>
              <Text style={{ fontSize: 18, color: 'black', opacity: isLoading ? 0.5 : 1, fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Icon
            name="add"
            type="MaterialIcons"
            style={styles.header_menu_icon}
          />
        )}
      </View>
    </View>
  </View>
);

export default HeaderClosePlus;
