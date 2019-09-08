'use strict'

const Route = use('Route')

Route.group(() => {
  Route.post('auth', 'SessionController.store')
}).prefix('api')
