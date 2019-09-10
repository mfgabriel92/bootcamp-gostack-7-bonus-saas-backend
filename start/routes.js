'use strict'

const Route = use('Route')

Route.post('api/auth', 'SessionController.store').validator('Session')
Route.post('api/users', 'UserController.store').validator('User')

Route.group(() => {
  Route.get('api/roles', 'RoleController.index')
  Route.resource('api/teams', 'TeamController')
    .apiOnly()
    .validator(new Map([[['teams.store', 'teams.update'], ['Team']]]))
}).middleware('auth')

Route.group(() => {
  Route.post('api/invitations', 'InvitationController.store')
    .validator('Invitation')
    .middleware('can:create-invitations')

  Route.resource('api/projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store', 'projects.update'], ['Project']]]))
    .middleware(new Map([[['projects.store', 'projects.update'], ['can:create-projects']]]))

  Route.get('api/members', 'MemberController.index')
  Route.put('api/members/:id', 'MemberController.update').middleware('is:admin')
  Route.get('api/permissions', 'PermissionController.show')
}).middleware(['auth', 'team'])
