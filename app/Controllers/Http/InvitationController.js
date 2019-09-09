'use strict'

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
  async store ({ request, response }) {
    return request.team
  }
}

module.exports = InvitationController
