import React, {useMemo} from 'react'
import {View, TouchableOpacity, Text, FlatList} from 'react-native'
import {Icon, Spinner} from 'native-base'
import useAxios from 'axios-hooks'
import {getDistance} from 'geolib'
import Header from '../../components/header/Header'
import styles from './styles'
import {useGlobalState} from '../../state/GlobalState'
import {Row, Screen, CreditIcon} from '../../components/styled'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

var monthOldDate = new Date()
monthOldDate.setDate(monthOldDate.getDate() - 30)

const Leads = props => {
  const [profile] = useGlobalState('profile')
  const stateArr = profile?.State.split(',') || []
  const countyArr = stateArr?.[0].split(' ') || []
  const county = countyArr?.length ? countyArr[countyArr.length - 1] : ''
  const [preferences] = useGlobalState('preferences')

  const [searchCoachesReq, searchCoaches] = useAxios(
    {
      url: `/Users/SearchPost`,
      method: 'POST',
      data: {search: ''},
    },
    {manual: true},
  )
  const [getResponsesReq, getResponses] = useAxios(
    {url: '/Users/GetResponses'},
    {manual: true},
  )

  const [getWebLeadsReq, getWebLeads] = useAxios(
    {url: `/Users/GetLeads/${county}`},
    {manual: true},
  )

  React.useEffect(() => {
    searchCoaches({data: {search: ''}})
  }, [])

  React.useEffect(() => {
    getWebLeads()
    getResponses()
  }, [profile?.Credits])

  const players =
    searchCoachesReq?.data?.Players.filter(
      p => !getResponsesReq.data?.find(r => r.Lead.UserId === p.Id),
    ) || []

  const distanceToLead = lead => {
    return getDistance(
      {
        latitude: preferences?.county || county,
        longitude: preferences?.lng || profile?.Lng,
      },
      {latitude: lead.Lat, longitude: lead.Lng},
    )
  }

  const distanceFilter = (a, b) => {
    return a.Distance - b.Distance
  }

  // const latestFilter = (a, b) => {
  //   return a.CreatedAt - b.CreatedAt
  // }

  const nearest = useMemo(() => {
    return players
      // .filter(a => a.Lat && a.Lng)
      // .map(l => ({...l, Distance: distanceToLead(l)}))
      .sort(distanceFilter)
      .filter(l => l.Distance < Number(preferences?.range || 50) * 1000)
      .concat(
        getWebLeadsReq?.data?.filter(
          item => !getResponsesReq.data.find(r => r.Lead.Id === item?.Id),
        ),
      )
      .filter(a => monthOldDate < new Date(a?.CreatedAt))
      .filter(a => a.Location.includes(preferences ? preferences.county : county))
      .sort((a, b) =>
        a.CreatedAt && b.CreatedAt
          ? new Date(b.CreatedAt) - new Date(a.CreatedAt)
          : -1,
      )
  }, [players.length, preferences?.range, preferences?.lat, preferences?.lng, preferences?.county])

  return (
    <Screen>
      <Header
        title="Customers"
        hideCreatePost
        customButton={() => <FilterButton navigation={props.navigation} />}
      />
      {getResponsesReq.loading ||
      searchCoachesReq.loading ||
      getWebLeadsReq.loading ? (
        <Spinner size={30} color="#80849D" />
      ) : (
        <FlatList
          data={nearest}
          keyExtractor={item => item.Id}
          renderItem={({item}) => (
            <LeadItem
              item={item}
              navigation={props.navigation}
              country={stateArr[stateArr.length - 1]}
            />
          )}
          ListHeaderComponent={() => (
            <ListHeader
              navigation={props.navigation}
              numLeads={nearest.length}
            />
          )}
          ListHeaderComponentStyle={{marginBottom: 15}}
          ItemSeparatorComponent={Seperator}
        />
      )}
    </Screen>
  )
}

const LeadItem = ({item, navigation, country}) => {
  const timeAgo = new TimeAgo('en-US')

  // if (monthOldDate > new Date(item.CreatedAt)) return null
  return (
    <TouchableOpacity
      style={styles.leadItem}
      onPress={() =>
        navigation.navigate('LeadDetails', {
          player: item,
          address: item.State ? item.State : '',
          AboutUs: item.AboutUs,
          Id: item.Id,
        })
      }>
      {item.QuoteRequested && <Text style={styles.leadIndicator}>•</Text>}
      <Row style={{alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <Text style={styles.leadName}>{item.FullName}</Text>
        <Text style={styles.creditText}>
          {timeAgo.format(new Date(item.CreatedAt))}
        </Text>
      </Row>
      <Text style={styles.leadDetail}>Football Coaching</Text>
      {!!item.Address && (
        <Row mb={4} style={{alignItems: 'flex-start'}}>
          <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
          <Text style={styles.locationText}>
            {item.State ? item.State : ''}
          </Text>
        </Row>
      )}
      {item.Web && (
        <Row mb={4} style={{alignItems: 'flex-start'}}>
          <Icon type="Feather" name="map-pin" style={styles.locationIcon} />
          <Text style={styles.locationText}>
            {`${item.Location}, ${country}`}
          </Text>
        </Row>
      )}
      <Row mb={4} style={{alignItems: 'flex-start'}}>
        <CreditIcon />
        <Text style={styles.creditText}>1 Credit</Text>
      </Row>
      {item.QuoteRequested && (
        <View style={styles.quoteTag}>
          <Text style={{color: '#3ABA96'}}>
            This customer has a requested quote
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const ListHeader = ({numLeads, navigation}) => {
  return (
    <>
      <Seperator opacity={0.2} />
      <View style={styles.listHeaderPref}>
        <Text style={styles.prefText}>{numLeads} customers matching your </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LeadPreferences')}>
          <Text style={styles.prefLink}>Customer preferences</Text>
        </TouchableOpacity>
      </View>
      <Seperator opacity={0.2} />
      <View style={styles.listHeaderStatus}>
        <Text style={styles.totalShowing}>
          Showing all {numLeads} customers
        </Text>
        <Text style={styles.lastUpdated}>Updated just now</Text>
      </View>
      <Seperator opacity={0.2} />
    </>
  )
}

const FilterButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      <Icon
        onPress={() => navigation.navigate('LeadPreferences')}
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

export default Leads
