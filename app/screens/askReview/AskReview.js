import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, Linking } from 'react-native'
import NLButton from '../../components/NLButton'
import Dimensions from '../../constants/dimensions'
import Color from '../../constants/color'
import Images from '../../constants/image';

const AskReview = ({ navigation }) => {
  const openOnPlaystore = () => {
    Linking.openURL('https://google.com')
  }

  const goHome = () => {
    navigation.navigate("Home")
  }

  return (
    <SafeAreaView style={styles.areaView}>

      <Image style={styles.image} source={Images.Logo} />

      <Text style={styles.title}>Please share your experience with us</Text>

      <View style={styles.buttonsWrapper}>
        <NLButton onPress={openOnPlaystore} value="Submit" />
        <NLButton onPress={goHome} color="transparent" value="Remind me later" textStyles={{ color: Color.s_blue }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.px160,
    height: Dimensions.px160,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.pro15
  },
  title: { fontSize: Dimensions.px20, textAlign: "center", marginTop: Dimensions.pro20 },
  areaView: { backgroundColor: "white", flex: 1 },
  buttonsWrapper: { marginTop: "auto", marginLeft: "auto", marginRight: "auto", width: Dimensions.pro90 },
});

export default AskReview