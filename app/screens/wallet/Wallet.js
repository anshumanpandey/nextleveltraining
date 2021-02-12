import React from 'react'
import {Icon, Spinner} from 'native-base'
import {Image, ScrollView, Text, View, FlatList} from 'react-native'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import styles from './styles'
import useAxios from 'axios-hooks'
import {useGlobalState} from '../../state/GlobalState'

const Wallet = props => {
  const [profile] = useGlobalState('profile')
  const [{loading, data}] = useAxios('/Users/GetCreditHistory')

  const renderItem = ({item}) => {
    const temp = item.CreatedAt.split('T')
    const date = temp[0].split('-')
    return (
      <View style={styles.historyItem}>
        <View style={styles.itemRow}>
          <Text style={styles.titleText}>Paypal</Text>
          <Text style={styles.amountText}>£ {item.AmountPaid}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text
            style={styles.infoText}>{`${date[2]}-${date[1]}-${date[0]}`}</Text>
          <Text style={styles.infoText}>{item.Credits} Credits</Text>
        </View>
      </View>
    )
  }

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
          <Text style={{fontSize: 35}}>{profile.Credits || 0}</Text>
          <Image
            style={{width: 30, height: 20}}
            resizeMode="contain"
            source={Images.LogoOnly}
          />
        </View>
        <Text style={styles.infoText}>Credits</Text>
      </View>

      {loading ? (
        <Spinner size={30} color="#80849D" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.infoText}>No credit history</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </ScrollView>
  )
}

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
)

export default Wallet
