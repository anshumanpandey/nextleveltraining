import Dimension from '../../constants/dimensions.js'
import Colors from '../../constants/color.js'
import {StyleSheet} from 'react-native'


const styles =StyleSheet.create({

    header_layout:{
        width:Dimension.pro100,
        height:Dimension.px55,
        backgroundColor:Colors.s_yellow,
        flexDirection:'row',
        alignItems:'center',
    },
    header_item_container:{
      paddingHorizontal:10,
      width:Dimension.pro100,
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',
      display:'flex'
    },
    header_menu_icon:{
        fontSize:22,
        color:'white'
    }
   
  
})
export default styles;