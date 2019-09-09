'use strict'

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   */
  async index ({ auth }) {
    return auth.user.teams().fetch()
  }

  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async store ({ request, auth }) {
    const data = request.only(['name'])

    return auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    })
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Response} ctx.response
   */
  async show ({ params, auth }) {
    return auth.user
      .teams()
      .where('teams.id', params.id)
      .first()
  }

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async update ({ params, request, auth }) {
    const data = request.only(['name'])
    const team = await auth.user
      .teams()
      .where('teams.id', params.id)
      .first()

    team.merge(data)

    await team.save()

    return team
  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Auth} ctx.auth
   */
  async destroy ({ params, auth }) {
    const team = await auth.user
      .teams()
      .where('teams.id', params.id)
      .first()

    await team.delete()
  }
}

module.exports = TeamController
