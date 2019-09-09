'use strict'

const User = use('App/Models/User')
const Invitation = use('App/Models/Invitation')

class UserController {
  /**
   * Create/save a new invitation.
   * POST invitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store ({ request, response, auth }) {
    const data = request.only(['name', 'email', 'password'])
    const teamsQuery = Invitation.query().where('email', data.email)
    const teamsInvited = await teamsQuery.pluck('team_id')

    if (teamsInvited.length === 0) {
      return response
        .status(401)
        .send({ message: 'You must be invited to a team before registering' })
    }

    const user = await User.create(data)

    await user.teams().attach(teamsInvited)
    await teamsQuery.delete()

    return auth.attempt(data.email, data.password)
  }
}

module.exports = UserController
