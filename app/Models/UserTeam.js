'use strict'

const Model = use('Model')

class UserTeam extends Model {
  user () {
    return this.hasMany('App/Models/User')
  }
}

module.exports = UserTeam
