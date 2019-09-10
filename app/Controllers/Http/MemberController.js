'use strict'

const UserTeam = use('App/Models/UserTeam')

/**
 * Resourceful controller for interacting with members
 */
class MemberController {
  /**
   * Show a list of all members.
   * GET members
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    return UserTeam.query()
      .where('team_id', request.team.id)
      .with('user')
      .with('roles')
      .fetch()
  }

  /**
   * Update member details.
   * PUT or PATCH member/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ request, params }) {
    const roles = request.input('roles')
    const joinedTeams = await UserTeam.find(params.id)

    await joinedTeams.roles().sync(roles)
  }
}

module.exports = MemberController
