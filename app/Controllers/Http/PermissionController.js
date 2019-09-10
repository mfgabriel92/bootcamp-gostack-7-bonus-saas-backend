'use strict'

const UserTeam = use('App/Models/UserTeam')

/**
 * Resourceful controller for interacting with members
 */
class PermissionController {
  /**
   * Display roles and permissions.
   * GET permissions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show ({ request, auth }) {
    const joinedTeam = await UserTeam.query()
      .where('team_id', request.team.id)
      .where('user_id', auth.user.id)
      .first()

    return {
      roles: await joinedTeam.getRoles(),
      permissions: await joinedTeam.getPermissions()
    }
  }
}

module.exports = PermissionController
