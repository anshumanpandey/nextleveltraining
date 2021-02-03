import {Icon} from 'native-base'
import React from 'react'
import {Image, ScrollView, Text, View, FlatList} from 'react-native'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import styles from './styles'
import useAxios from 'axios-hooks'

const Wallet = props => {
  // const amount = props.navigation.getParam('amount', 0);

  const [total, setTotal] = React.useState(0)
  const [creditsData, setCredidtsData] = React.useState([])
  const [creditsHistoryData, getCreditsHistory] = useAxios(
    {
      url: '/Users/GetCreditHistory',
      method: 'GET',
    },
    {manual: true},
  )

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    getCreditsHistory()
      .then(res => {
        if (res.status === 200) {
          let count = 0
          res.data.forEach(item => {
            count = count + item.Credits 
          })
          setTotal(count)
          setCredidtsData(res.data)
        }
      })
      .catch(e => {})
  }

  const renderItem = ({ item, index }) => {
    const date = item.CreatedAt.split("T")
    return (
      <View style={styles.historyItem}>
        <View style={styles.itemRow}>
          <Text style={styles.titleText}>Paypal</Text>
          <Text style={styles.amountText}>£ {item.AmountPaid}</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.infoText}>{date[0]}</Text>
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
          <Text style={{fontSize: 35}}>
            {creditsData.length === 0 ? 0 : total}
          </Text>
          <Image
            style={{width: 30, height: 20}}
            resizeMode="contain"
            source={Images.LogoOnly}
          />
        </View>
        <Text style={styles.infoText}>Credits</Text>
      </View>
      <FlatList
        data={creditsData}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.infoText}>No credit history</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
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
)

export default Wallet
