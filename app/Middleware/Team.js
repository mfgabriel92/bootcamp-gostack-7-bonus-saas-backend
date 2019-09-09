'use strict'

class Team {
  async handle ({ request, response, auth }, next) {
    const slug = request.header('Team')
    let team = null

    if (slug) {
      team = await auth.user
        .teams()
        .where('slug', slug)
        .first()
    }

    if (!team) {
      return response.status(401).send()
    }

    request.team = team
    auth.user.currentTeam = team.id

    await next()
  }
}

module.exports = Team
