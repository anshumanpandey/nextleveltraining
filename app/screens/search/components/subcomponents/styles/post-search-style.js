import Dimension from '../../../../../constants/dimensions'
import Colors from '../../../../../constants/color'
import {StyleSheet} from 'react-native'


const styles =StyleSheet.create({
    ps_container:{
      flexDirection:'row',
      backgroundColor:'white',
      borderBottomColor:'#DEDEDE',
      borderBottomWidth:1
    },
    ps_image:{
        width:60,
        height:60,
        borderRadius:30
    },
    ps_star_view:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginTop:10
    },
    ps_star_point:{
         color:"#38A663"
    },
    ps_pound_symbol:{
         color:Colors.s_blue,
         fontSize:16
    },
    ps_hourly_symbol:{
        flexDirection:'row',
        alignItems:'center'
    },
    ps_dbs_check:{
        fontWeight:'500',
        color:Colors.s_blue,
        marginRight:10
    },
    ps_heart_view:{
        width:30,
        height:30,
        marginRight:10,
        borderRadius:15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop:5
        

    }
  
})
export default styles;