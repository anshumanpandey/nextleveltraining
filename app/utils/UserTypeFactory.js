/** @typedef {Object} UserTypeFactoryParams
 * @property {function} forCoach
 * @property {function} forPlayer
 * @property {Object} user
 */


 /**
  * render conditally code for coaches or players
  * @param {UserTypeFactoryParams} params
  */
export default (params) => {
    if (params.user && params.user.Role.toLowerCase() == 'coach') {
        return params.forCoach()
    }

    return params.forPlayer();

}