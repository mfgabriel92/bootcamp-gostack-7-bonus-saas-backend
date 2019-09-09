'use strict'

const Route = use('Route')

Route.post('api/auth', 'SessionController.store')
Route.post('api/users', 'UserController.store')

Route.group(() => {
  Route.resource('api/teams', 'TeamController').apiOnly()
}).middleware('auth')

Route.group(() => {
  Route.post('api/invitations', 'InvitationController.store')
}).middleware(['auth', 'team'])
