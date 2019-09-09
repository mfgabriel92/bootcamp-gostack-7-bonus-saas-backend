'use strict'

class SessionController {
  /**
   * Create/save a new invitation.
   * POST invitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
