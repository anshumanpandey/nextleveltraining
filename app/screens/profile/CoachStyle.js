import Colors from '../../constants/color'
import { Dimensions, StyleSheet } from 'react-native'
const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

const styles = StyleSheet.create({
    containerCommon: {
        width: WINDOW_WIDTH * 0.8,
        margin: scaleSize(20),
        flexDirection: "column",
    },
    containerAbout: {
        width: "100%",
        flexDirection: "column",
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    ImageContainer: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: scaleSize(5),
        backgroundColor: "white"
    },
    cardContainer: {
        paddingHorizontal: scaleSize(10),
        backgroundColor: "white",
        flexDirection: "column",
        marginBottom: '2%'
    },
    cardInner: {
        margin: scaleSize(10),
        justifyContent: "space-between",
        flexDirection: "row"
    },
    inputContainer: {
        borderBottomWidth: 0.8,
        borderBottomColor: "lightgrey"
    },
    buttonSave: {
        width: "80%",
        backgroundColor: Colors.s_blue,
        borderRadius: scaleSize(25),
        height: scaleSize(50),
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginTop: scaleSize(20),
        marginBottom: scaleSize(10),
    },
    fullFlatListContainer: {
        margin: scaleSize(10),
        flex: 1
    },
    flatList: {
        padding: scaleSize(10),
        height: scaleSize(50),
        flexDirection: 'row',
        borderBottomColor: "lightgrey",
        borderBottomWidth: 0.5
    },
    flatListContainer: {
        margin: scaleSize(10),
        flex: 0.8
    },
    locationImage: {
        height: scaleSize(30),
        width: scaleSize(30),
        borderRadius: scaleSize(15),
        marginLeft: scaleSize(5)
    },
    profileImage: {
        height: scaleSize(70),
        width: scaleSize(70),
        borderRadius: scaleSize(35),
        marginBottom: scaleSize(10)

    },
    profileEditIcon: {
        height: scaleSize(20),
        width: scaleSize(20),
        top: 0,
        position: "absolute",
        right: scaleSize(155),
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: scaleSize(12),
        justifyContent: 'center',
    },
    screenTitle: {
        alignItems: "center",
        marginTop: scaleSize(10)
    },
    description: {
        fontSize: scaleSize(11),
        fontStyle: 'italic',
        color: "#a9a9a9",
    },
    profileDescription: {
        fontSize: scaleSize(14),
        color: "#a9a9a9",
    },
    textProfile: {
        color: Colors.s_blue,
    },
    collapsedView: {
        height: 45,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    collapsedViewInner: {
        width: '100%',
        borderBottomColor: "lightgrey",
        borderBottomWidth: 0.5
    }

})
export default styles;
