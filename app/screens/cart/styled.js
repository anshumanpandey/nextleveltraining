import styled from 'styled-components/native'
import Dimension from '../../constants/dimensions'

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8fa;
`

export const LogoContainer = styled.View`
  width: ${Dimension.pro100};
  justify-content: center;
  align-items: center;
  margin: ${Dimension.px15}px 0;
`

export const Logo = styled.Image`
  height: 100px;
  width: 100px;
`

export const Card = styled.View`
  width: 95%;
  height: 250px;
  align-self: center;
  justify-content: space-evenly;
  background-color: white;
  margin-bottom: 15px;
  padding: 0 15px;
  border-radius: 5px;
  opacity: 1;
  elevation: 1;
  shadow-opacity: 0.2;
  shadow-offset: 1px 1px;
`

export const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  align-self: center;
`

export const Button = styled.TouchableOpacity`
  height: 50px;
  border-radius: 5px;
  background-color: #2d7af0;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 500;
`
