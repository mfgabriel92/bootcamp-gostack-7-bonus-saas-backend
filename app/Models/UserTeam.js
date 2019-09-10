'use strict'

const Model = use('Model')

class UserTeam extends Model {
  static get traits () {
    return ['@provider:Adonis/Acl/HasRole', '@provider:Adonis/Acl/HasPermission']
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  roles () {
    return this.belongsToMany('Adonis/Acl/Role')
  }

  permissions () {
    return this.belongsToMany('Adonis/Acl/Permission')
  }
}

module.exports = UserTeam
