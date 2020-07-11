import Dimension from '../../constants/dimensions.js'
import Colors from '../../constants/color.js'
import {StyleSheet} from 'react-native'


const styles =StyleSheet.create({

    level_container:{
        backgroundColor:'white',
        height:Dimension.pro100,
        width:Dimension.pro100
    } ,
    level_logo_view:{
         width:Dimension.pro100,
         justifyContent:'center',
         alignItems:'center',
         display:'flex',
         marginTop:Dimension.px50
    },
    level_logo_text:{
         fontSize:18,
         color:Colors.g_text,
         marginTop:Dimension.px20,
         fontWeight:'bold'
    },
    level_btn_view:{
        width:Dimension.pro100,
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        marginTop:Dimension.px40
    },
    level_btn_player:{
        width:Dimension.pro80,
        height:Dimension.px50,
        backgroundColor:Colors.s_blue,
        borderRadius:25
    },
    level_btn_player_view:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:5    
    },
    level_btn_icon_size:{
        width:40,
        height:40,
        marginLeft:20
    },
    level_player_text:{
        fontSize:18,
        color:'white',
        width:Dimension.pro100,
        marginLeft:Dimension.px40,
        fontWeight:'500'
    },

    level_btn_coach:{
        width:Dimension.pro80,
        height:Dimension.px50,
        backgroundColor:Colors.s_yellow,
        marginTop:Dimension.px15,
        borderRadius:25
    },

    level_other_view:{
        width:Dimension.pro100,
        marginTop:Dimension.px60,
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
    },
    level_line:{
         width:Dimension.pro90,
         height:1,
         backgroundColor:Colors.g_text
    },
    level_other_check_view:{
         marginTop:Dimension.px20,
         flexDirection:'row'
    },
    level_check_text:{
        fontSize:16,
        color:Colors.g_text
    },
    level_signin_text:{
        fontSize:16,
        color:Colors.s_blue,
        textDecorationLine:'underline'
    }
  
})
export default styles;