import React from 'react'
import {FlatList, Text} from 'react-native'
import CheckBox from '@react-native-community/checkbox'

import Header from '../../components/header/Header'
import Images from '../../constants/image'
import {Row} from '../../components/styled'
import {
  Button,
  ButtonText,
  Card,
  CardTitle,
  Container,
  Logo,
  LogoContainer,
} from './styled'

const Cart = ({navigation}) => {
  const items = [
    {credits: 1, price: 5},
    {credits: 5, price: 15},
    {credits: 10, price: 20},
  ]

  return (
    <Container>
      <Header title="Credits" hideCreatePost />

      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx}
        renderItem={({item}) => (
          <CardItem navigation={navigation} item={item} />
        )}
        ListHeaderComponent={() => (
          <LogoContainer>
            <Logo source={Images.Mlogo} />
          </LogoContainer>
        )}
      />
    </Container>
  )
}

const CardItem = ({navigation, item}) => {
  return (
    <Card>
      <CardTitle>Buy Credits</CardTitle>
      {item.credits === 1 ? (
        <Text style={{fontWeight: '500'}}>About {item.credits} response</Text>
      ) : (
        <Text style={{fontWeight: '500'}}>About {item.credits} responses</Text>
      )}

      {item.credits === 1 ? (
        <Text style={{fontWeight: '500'}}>{item.credits} credit</Text>
      ) : (
        <Text style={{fontWeight: '500'}}>{item.credits} credits</Text>
      )}

      <Row>
        <Text style={{fontWeight: '700'}}>£ {item.price}</Text>
        <Text style={{fontWeight: '500'}}> + VAT</Text>
      </Row>

      <Button
        onPress={() =>  
          navigation.navigate('PayCredits', {
            amount: item.price,
            credits: item.credits,
          })
        }>
        <ButtonText>Buy credits</ButtonText>
      </Button>

      <Row>
        <CheckBox value={false} onValueChange={() => {}} />
        <Text style={{fontWeight: '500', marginLeft: 10}}>
          Auto top-up next time
        </Text>
      </Row>
    </Card>
  )
}

export default Cart
