'use strict'

const Model = use('Model')

class Invitation extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'InvitationHook.sendInvitationEmail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  team () {
    return this.belongsTo('App/Models/Team')
  }
}

module.exports = Invitation
