import Dimension from '../../constants/dimensions.js'
import Colors from '../../constants/color.js'
import {StyleSheet} from 'react-native'


const styles =StyleSheet.create({
    signup_layout:{
      flex:1
    },
    fullFlatListContainer:{
        margin:10,
        flex: 1
    },
    notFoundText:{
    alignSelf:"center",
    fontSize:20

    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft:12 ,
        //justifyContent: 'center',
    },
    innerRow:{
     flexDirection:"row",
     justifyContent:"space-between"
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        color:"#a9a9a9",
    },
    description1: {
        fontSize: 11,
        fontStyle: 'italic',
        color:"black",
    },
    userImage :{
        height:50,
        width:50,
        borderRadius:25,
        marginLeft:5
    },
    flatList:{
        padding: 10,
        height: 90,
        flexDirection: 'row',
    },
    signup_container:{
        backgroundColor:'white',
        height:Dimension.pro100,
        width:Dimension.pro100
    } ,

})
export default styles;