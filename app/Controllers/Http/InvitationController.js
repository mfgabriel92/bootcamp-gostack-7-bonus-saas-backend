'use strict'

const Invitation = use('App/Models/Invitation')

/**
 * Resourceful controller for interacting with invitations
 */
class InvitationController {
  /**
   * Create/save a new invitation.
   * POST invitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const emails = request.input('emails')
    const data = emails.map(email => ({
      email,
      user_id: auth.user.id,
      team_id: request.team.id
    }))

    await Invitation.createMany(data)
  }
}

module.exports = InvitationController
