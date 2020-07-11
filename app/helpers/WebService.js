import {ENDPOINT} from '../api/Endpoint'
import NetworkHelper from './NetworkHelper'

function WService() {
    this.url = ENDPOINT
  }

  WService.prototype.makeUrl = function (resource) {
    var url = this.url + resource
    return url
  }

  WService.prototype.signUp = function (name,email,birthday,user_type,password) {
    return NetworkHelper.requestPost(this.makeUrl('/user/register'), { name,email,birthday,user_type,password})
  }

 
  
  WService.prototype.signIn = function (email, password) {
    return NetworkHelper.requestPost(this.makeUrl('/user/login'), { email, password })
  }

  
  module.exports = WService