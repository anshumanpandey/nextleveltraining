import React, {useEffect} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
} from 'react-native'
import {Icon} from 'native-base'
import Header from '../../components/header/Header'
import styles from './styles'
import useAxios from 'axios-hooks'
import {useGlobalState} from '../../state/GlobalState'

const Responses = props => {
  const [profile] = useGlobalState('profile')
  const [{loading, data: responses}, getResponses] = useAxios(
    'Users/GetResponses',
  )

  useEffect(() => {
    getResponses()
  }, [profile?.Credits])

  return (
    <View style={styles.container}>
      <Header title="Responses" hideCreatePost />
      <FlatList
        data={responses}
        keyExtractor={(_, idx) => idx}
        renderItem={({item}) => (
          <ResponseItem item={item} navigation={props.navigation} />
        )}
        ListHeaderComponent={() => (
          <ListHeader numResponses={responses ? responses.length : 0} />
        )}
        ListHeaderComponentStyle={{marginBottom: 15}}
        ItemSeparatorComponent={Seperator}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getResponses} />
        }
      />
    </View>
  )
}

const ResponseItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ResponseDetails', {lead: item})}
      style={styles.responseItem}>
      <Text style={styles.responseName}>{item.Lead.FullName}</Text>
      <Text style={styles.responseDetail}>Football Coaching</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
        <Text style={styles.locationText}>{item.Lead.Location}</Text>
      </View>
    </TouchableOpacity>
  )
}

const ListHeader = ({numResponses}) => {
  return (
    <>
      <Seperator opacity={0.2} />
      <View style={styles.listHeaderStatus}>
        {numResponses > 1 ? (
          <Text style={styles.totalShowing}>
            Showing all {numResponses} responses
          </Text>
        ) : (
          <Text style={styles.totalShowing}>
            Showing {numResponses} response
          </Text>
        )}

        <Text style={styles.lastUpdated}>Updated just now</Text>
      </View>
      <Seperator opacity={0.2} />
    </>
  )
}

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
  )
}

const Seperator = ({opacity = 0.3}) => (
  <View style={{height: 1, backgroundColor: '#C7C9D6', opacity}} />
)

export default Responses
