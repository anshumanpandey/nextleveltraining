import React from 'react'
import {Icon} from 'native-base'
import styled from 'styled-components/native'
import {NavigationActions, StackActions} from 'react-navigation'
import Colors from '../../constants/color'

const SuccessPayCredits = props => {
  const onContinue = () => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'MainStack',
          action: NavigationActions.navigate({
            routeName: 'Profile',
            action: NavigationActions.navigate({routeName: 'Wallet'}),
          }),
        }),
      ],
    })
    props.navigation.dispatch(resetAction)
  }

  return (
    <Container>
      <SuccessIcon />
      <Title>Payment Successful</Title>
      <Info>Thank you for your payment</Info>

      <Button onPress={onContinue}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: white;
`

const SuccessIcon = styled(Icon).attrs({
  type: 'Feather',
  name: 'check-circle',
})`
  align-self: center;
  font-size: 50px;
  color: #5badfe;
`

const Title = styled.Text`
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
`

const Info = styled.Text`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  color: ${Colors.g_text};
`

const Button = styled.TouchableOpacity`
  background-color: #5badfe;
  padding: 16px;
  border-radius: 30px;
  margin: 50% 25px 0;
`

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`

export default SuccessPayCredits
