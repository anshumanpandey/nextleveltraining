import React from 'react';
import {View,Image,Text} from 'react-native'
import StarRating from 'react-native-star-rating';
import Images from '../../../../constants/image'
import {Icon} from 'native-base'
import styles from './styles/post-search-style'

const PostSearchCard =()=> {
    const [star,setStar]=React.useState(3.5)
  return (
    <View style={styles.ps_container}>
        <View style={{marginTop:15,marginLeft:10}}>
            <Image source={Images.MessiPlayer} style={styles.ps_image}/>
        <View style={styles.ps_star_view}>
            <Text style={styles.ps_star_point}>{star}</Text>
            <StarRating
                    disabled={false}
                    maxStars={1}
                    rating={star}
                    fullStarColor={'#38A663'}
                    starSize={16}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
           </View>
           
        </View>
        <View style={{marginTop:15,marginLeft:10,width:'80%'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <Text style={{marginTop:10,color:'#0F2F80',fontSize:16,fontWeight:'500'}}>John James</Text>
               <View style={styles.ps_heart_view}>
                 <Icon type="Feather" name="heart" style={{fontSize:19,color:"#0F2F80"}}/>
               </View>
            </View>
           
            <View style={{width:'80%'}}>
                <Text>LoremIpsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'85%',marginTop:10}}>
                    <View style={styles.ps_hourly_symbol}>
                    <Text style={styles.ps_pound_symbol}>{'\u00A3'}</Text>
                    <Text style={{marginLeft:5}}>250/hr</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.ps_dbs_check}>DBS Checked</Text>
                        <Icon type="Feather" name="check" style={{fontSize:20,color:'#38A663'}}/>
                    </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'85%',marginTop:10}}>
                    <View style={styles.ps_hourly_symbol}>
                     <Icon type="FontAwesome" name="map-marker" style={{fontSize:20,color:"#0F2F80"}}/>
                    <Text style={{marginLeft:5}}>250/hr</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.ps_dbs_check}>Valid ID</Text>
                        <Icon type="MaterialIcons" name="close" style={{fontSize:20,color:'red'}}/>
                    </View>
            </View>
            <View style={{flexWrap:'wrap',flexDirection:'row',alignItems:'center',width:'80%',marginTop:10,justifyContent:'space-between',marginBottom:10}}>
               <View style={{flexDirection:'row'}}>
                 <Icon type="Feather" name="check-square" style={{fontSize:16,color:'#38A663'}}/>
                  <Text>Qualification 1</Text>
               </View>
               <View style={{flexDirection:'row'}}>
                 <Icon type="Feather" name="check-square" style={{fontSize:16,color:'#38A663'}}/>
                  <Text>Qualification 2</Text>
               </View>
               <View style={{flexDirection:'row'}}>
                 <Icon type="Feather" name="check-square" style={{fontSize:16,color:'#38A663'}}/>
                  <Text>Qualification 3</Text>
               </View>
               <View style={{flexDirection:'row'}}>
                 <Icon type="Feather" name="check-square" style={{fontSize:16,color:'#38A663'}}/>
                  <Text>Qualification 4</Text>
               </View>
            </View>
            
        </View>
    
    </View>
  );
}

export default PostSearchCard
