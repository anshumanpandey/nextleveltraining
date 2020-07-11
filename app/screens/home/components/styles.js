import Dimension from '../../../constants/dimensions.js'
import Colors from '../../../constants/color.js'
import {StyleSheet} from 'react-native'


const styles =StyleSheet.create({

    post_container:{
        width:Dimension.pro100,
    },
    post_card_container:{
        padding:10,
        flexDirection:'row'
    },
    post_image_size:{
        width:50,
        height:50,
        borderRadius:25
    },
    post_content_view:{
        marginHorizontal:10,
        width:Dimension.pro75
    },
    post_title:{
        flexDirection:'row',
        alignItems:'center',
        display:'flex',
       
    },
    post_title_name:{
        fontSize:16,
        color:Colors.s_blue
    },
    post_title_time:{
        marginLeft:10
    },
    post_description:{
      marginTop:10   
    },
    post_news_content:{
         marginLeft:10
        // width:'90%'
    },
    post_news_image:{
        height:Dimension.px200,
        width:Dimension.deviceWidth-20,
        borderRadius:10
    },
    post_news_comment:{
        flexDirection:'row',
        width:Dimension.deviceWidth-20,
        marginLeft:10,
        justifyContent:'space-between',
        marginTop:10
    },
    post_news_like:{
       flexDirection:'row',
       alignItems:'center',
       
    },
    post_tumb_up:{
        fontSize:20,
        color:Colors.s_blue
    },
    post_like:{
        marginLeft:10
    },
    post_comment:{
        fontSize:20,
        color:Colors.s_blue,
        marginRight:10
    }
  
})
export default styles;