import React, { Component } from 'react'
import { FlatList } from 'react-native'
import PostSearchCard from './subcomponents/PostSearchCard'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../../state/GlobalState'
import NavigationService from '../../../navigation/NavigationService';

const SavedComponent = (props) => {
  const [profile] = useGlobalState('profile')

  const [searchCoachesReq, searchCoaches] = useAxios({
    url: `/Users/GetCoaches`,
    method: 'POST',
    data: {
      "playerId": profile.Id,
      "search": ""
    }
  })

  return (
    <>
      <FlatList
        horizontal={false}
        data={searchCoachesReq.data ? searchCoachesReq.data.filter(c => c.Status == "Saved") : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostSearchCard
            {...item}
            onPress={() => NavigationService.navigate('Information', { ...item })}
            refreshCb={() => {
              searchCoaches({
                data: {
                  playerId: profile.Id,
                  search: keyword
                }
              })
                .then((r) => setCoaches(r.data))
            }}
          />
        )}
      />
    </>
  )
}

export default SavedComponent
