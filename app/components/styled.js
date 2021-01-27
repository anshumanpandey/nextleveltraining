import styled, {css} from 'styled-components/native'

export const Screen = styled.View`
  flex: 1;
  background-color: ${props => props.bg || '#F8F8FA'};
`

const marginStyles = ({m, mx, my, ml, mr, mt, mb}) =>
  css`
    margin-left: ${m || mx || ml || 0}px;
    margin-right: ${m || mx || mr || 0}px;
    margin-top: ${m || my || mt || 0}px;
    margin-bottom: ${m || my || mb || 0}px;
  `

const paddingStyles = ({p, px, py, pl, pr, pt, pb}) =>
  css`
    padding-left: ${p || px || pl || 0}px;
    padding-right: ${p || px || pr || 0}px;
    padding-top: ${p || py || pt || 0}px;
    padding-bottom: ${p || py || pb || 0}px;
  `

export const View = styled.View`
  ${marginStyles}
  ${paddingStyles}
`

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`

export const Text = styled.Text`
  ${marginStyles}
  ${paddingStyles}

  ${props =>
    props.weight &&
    css`
      font-weight: ${props.weight};
    `}
`

export const CreditIcon = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  source: Images.LogoOnly,
}))`
  width: 30px;
  height: 20px;
`
