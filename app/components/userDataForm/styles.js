import { StyleSheet } from 'react-native'
import Dimension from '../../constants/dimensions.js'
import Colors from '../../constants/color.js'


const styles = StyleSheet.create({
    signup_layout: {
        width: Dimension.pro100,
        height: Dimension.pro100,
        backgroundColor: 'white'
    },
    signup_container: {
        backgroundColor: 'white',
        height: Dimension.pro100,
        width: Dimension.pro100
    },
    signup_logo_view: {
        width: Dimension.pro100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: Dimension.px50
    },
    signup_logo_text: {
        fontSize: 18,
        color: Colors.g_text,
        marginTop: Dimension.px20,
        fontWeight: 'bold'
    },
    signup_info_input_view: {
        width: Dimension.pro100,
        alignItems: 'center',
        display: 'flex',
        marginTop: Dimension.px10
    },
    signup_info_view: {
        width: Dimension.pro80,
        padding: 1,
        borderBottomColor: Colors.g_text,
        borderBottomWidth: 1,
        marginTop: Dimension.px1
    },
    signup_btn_view: {
        width: Dimension.pro100,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: Dimension.px40
    },
    signup_btn_player: {
        width: Dimension.pro80,
        height: Dimension.px50,
        backgroundColor: Colors.s_blue,
        borderRadius: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup_btn_player_view: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    signup_btn_icon_size: {
        width: 40,
        height: 40,
        marginLeft: 20
    },
    signup_player_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500'
    },

    signup_btn_coach: {
        width: Dimension.pro80,
        height: Dimension.px50,
        backgroundColor: Colors.s_yellow,
        marginTop: Dimension.px15,
        borderRadius: 25
    },

    signup_other_view: {
        width: Dimension.pro100,
        marginTop: Dimension.px25,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    signup_line: {
        width: Dimension.pro90,
        height: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: Colors.g_text
    },
    signup_continue: {
        position: 'absolute',
        top: -13,
        padding: 5,
        backgroundColor: 'white',
        color: Colors.g_text,
        fontSize: 16
    },
    signup_other_social_view: {
        marginTop: Dimension.px30,
        width: Dimension.pro100,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    signup_check_text: {
        fontSize: 16,
        color: Colors.g_text
    },
    signup_signin_text: {
        fontSize: 16,
        color: Colors.s_blue,
        textDecorationLine: 'underline'
    },
    fb_btn_view: {
        width: '40%',
        height: Dimension.px50,
        borderColor: Colors.s_blue,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    google_btn_view: {
        width: '40%',
        height: Dimension.px50,
        borderColor: 'red',
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25

    },
    fb_title: {
        fontSize: 16,
        color: Colors.s_blue,
    },
    google_title: {
        fontSize: 16,
        color: 'red',
    }

})
export default styles;