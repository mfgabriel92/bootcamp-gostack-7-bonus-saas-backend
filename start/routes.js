'use strict'

const Route = use('Route')

Route.post('api/auth', 'SessionController.store').validator('Session')
Route.post('api/users', 'UserController.store').validator('User')

Route.group(() => {
  Route.resource('api/teams', 'TeamController')
    .apiOnly()
    .validator(new Map([[['teams.store', 'teams.update'], ['Team']]]))
}).middleware('auth')

Route.group(() => {
  Route.post('api/invitations', 'InvitationController.store').validator('Invitation')
  Route.resource('api/projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store', 'projects.update'], ['Project']]]))
}).middleware(['auth', 'team'])
