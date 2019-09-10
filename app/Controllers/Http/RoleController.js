'use strict'

const Role = use('Adonis/Acl/Role')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
  /**
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index () {
    return Role.all()
  }
}

module.exports = RoleController
