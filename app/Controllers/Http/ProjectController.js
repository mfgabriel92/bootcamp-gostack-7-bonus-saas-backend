'use strict'

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    return request.team.projects().fetch()
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    const data = request.only(['title'])
    return request.team.projects().create(data)
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request }) {
    return request.team
      .projects()
      .where('id', params.id)
      .first()
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const data = request.only(['title'])
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first()

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request }) {
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first()

    await project.delete()
  }
}

module.exports = ProjectController
