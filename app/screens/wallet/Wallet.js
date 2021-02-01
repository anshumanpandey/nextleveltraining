import {Icon} from 'native-base';
import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';

const Wallet = (props) => {
  const amount = props.navigation.getParam('amount', 0);

  // const [savePaymenReq, savePayment] = useAxios(
  //   {
  //     url: '/Users/UpdatePaymentDetails',
  //     method: 'POST',
  //   },
  //   {manual: true},
  // );

  return (
    <ScrollView style={styles.container}>
      <Header
        title="My Credits"
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
        hideCreatePost
        customButton={() => (
          <>
            <BackButton navigation={props.navigation} />
            <Icon
              type="Feather"
              name="plus"
              onPress={() => props.navigation.navigate('Cart')}
              style={{
                position: 'absolute',
                right: 0,
                fontSize: 22,
                zIndex: 1,
                color: '#2D7AF0',
              }}
            />
          </>
        )}
      />
      <View style={styles.creditSection}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 35}}>{amount}</Text>
          <Image
            style={{width: 30, height: 20}}
            resizeMode="contain"
            source={Images.LogoOnly}
          />
        </View>
        <Text style={styles.infoText}>Credits</Text>
      </View>
      <View style={styles.historyItem}>
        <View style={styles.itemRow}>
          <Text style={styles.titleText}>Paypal</Text>
          <Text style={styles.amountText}>£ 20</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.infoText}>Sat 12 Dec 09:48</Text>
          <Text style={styles.infoText}>+20 credits</Text>
        </View>
      </View>
      <View style={styles.historyItem}>
        <View style={styles.itemRow}>
          <Text style={styles.titleText}>Paypal</Text>
          <Text style={styles.amountText}>£ 5</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.infoText}>Thu 9 Dec 02:11</Text>
          <Text style={styles.infoText}>+5 credits</Text>
        </View>
      </View>
    </ScrollView>
  )
};

const BackButton = ({navigation}) => (
  <Icon
    onPress={() => navigation.goBack()}
    type="Feather"
    name="arrow-left"
    style={{
      position: 'absolute',
      left: 15,
      fontSize: 22,
      zIndex: 1,
      color: '#2D7AF0',
    }}
  />
);

const AddButton = () => (
  <Icon
    type="Feather"
    name="plus"
    style={{
      position: 'absolute',
      right: 0,
      fontSize: 22,
      zIndex: 1,
      color: '#2D7AF0',
    }}
  />
);

export default Wallet;
