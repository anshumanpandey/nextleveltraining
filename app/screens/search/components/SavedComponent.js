import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import PostSearchCard from './subcomponents/PostSearchCard'
import useAxios from 'axios-hooks'
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../../state/GlobalState'
import NavigationService from '../../../navigation/NavigationService';
import { Spinner } from 'native-base'
import Colors from '../../../constants/color'

const SavedComponent = (props) => {
  const [profile] = useGlobalState('profile')

  const [getconnectedUserReq, refetch] = useAxios({
    url: '/Users/GetConnectedUsers',
  }, { manual: true })

  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/GetCoaches`,
    method: 'POST',
    data: {
      "playerId": profile?.Id,
      "search": ""
    }
  }, { manual: true })

  useEffect(() => {
    if (getconnectedUserReq.loading == false) {
      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.CONNECTED_USER, state: getconnectedUserReq.data })
    }
  }, [getconnectedUserReq.loading])

  const initFn = () => {
    if (profile?.Role == "Player") {
      searchCoaches({
        data: {
          "playerId": profile?.Id,
          "search": ""
        }
      })
    }
  }

  useEffect(() => {
    initFn();
    const unsubscribe = props.navigation.addListener('tabPress', e => {
      initFn()
    });

    return unsubscribe;
  }, [props.navigation]);

  if (searchCoachesReq.loading) return <Spinner color={Colors.s_yellow} size={48} />

  return (
    <>
      <FlatList
        horizontal={false}
        data={searchCoachesReq.data ? searchCoachesReq.data.filter(c => c.Status == "Saved").map(i => ({...i, Role: "Coach"})) : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostSearchCard
            {...item}
            onPress={() => NavigationService.navigate('Information', { ...item })}
            refreshCb={() => {
              searchCoaches({
                data: {
                  playerId: profile?.Id,
                  search: ""
                }
              })
            }}
          />
        )}
      />
    </>
  )
}

export default SavedComponent
