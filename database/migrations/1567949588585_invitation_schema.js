'use strict'

const Schema = use('Schema')

class InvitationSchema extends Schema {
  up () {
    this.create('invitations', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('team_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('teams')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('email').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('invitations')
  }
}

module.exports = InvitationSchema
