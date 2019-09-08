'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitationSchema extends Schema {
  up () {
    this.create('invitations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('invitations')
  }
}

module.exports = InvitationSchema
