import Dimension from '../../constants/dimensions.js'
import Colors from '../../constants/color.js'
import {StyleSheet} from 'react-native'

const styles=StyleSheet.create({
    menu_container:{
      backgroundColor:'white',
      height:Dimension.pro100,
    },
    menu_view:{
        width:Dimension.pro100,
        backgroundColor:'white',
        height:'100%'
    },
    menu_avatar:{
       justifyContent: 'center',
       alignItems:  'center',
       width:Dimension.pro100,
       height:200,
       backgroundColor:Colors.s_yellow
    },
    avatar_title:{
        color:'white',
        fontSize:16,
        fontWeight:'500',
        marginTop:10
    },
    imageAvatar:{
        width:100,
        height:100,
        borderRadius:50
    },
 
    menutitle:{
         fontSize:14,
         marginLeft:10,
    },
    menu_item_view:{
        paddingBottom:10,
        paddingTop:10,
        paddingHorizontal:10,
    },
    menu_inner_view:{
        alignItems:'center',
        flexDirection:'row',
        display:'flex',
    },
    menu_icon_size:{
        width:20,
        height:20
    }

      } )
      export default styles
