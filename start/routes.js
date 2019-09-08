'use strict'

const Route = use('Route')

Route.post('api/auth', 'SessionController.store')

Route.group(() => {
  Route.resource('teams', 'TeamController').apiOnly()
})
  .prefix('api')
  .middleware('auth')
