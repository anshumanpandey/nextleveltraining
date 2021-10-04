import PropTypes from 'prop-types';

const Screens = {
    SignUp: 'SignUp',
    Login: 'Login',
    Level: 'Level',
    LandingPage: 'MainStack',
    CreatePost: 'CreatePost',
    CreateComment: 'CreateComment',
    EditProfile: 'EditProfile'
}

export const ScreenNamesPropType = PropTypes.oneOf(Object.values(Screens))

export default Screens;
