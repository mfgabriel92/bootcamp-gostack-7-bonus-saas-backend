'use strict'

const Route = use('Route')

Route.post('/api/auth', 'SessionController.store').validator('Session')
Route.post('/api/users', 'UserController.store').validator('User')

Route.group(() => {
  // Role
  Route.get('/api/roles', 'RoleController.index')

  // Teams
  Route.get('/api/teams', 'TeamController.index')
  Route.get('/api/teams/:id', 'TeamController.show')
  Route.post('/api/teams', 'TeamController.store').validator('Team')
  Route.put('/api/teams/:id', 'TeamController.update')
  Route.delete('/api/teams/:id', 'TeamController.destroy')
}).middleware('auth')

Route.group(() => {
  // Invitation
  Route.post('/api/invitations', 'InvitationController.store')
    .validator('Invitation')
    .middleware('can:create-invitations')

  // Projects
  Route.get('/api/projects', 'ProjectController.index')
  Route.get('/api/projects/:id', 'ProjectController.show')
  Route.post('/api/projects', 'ProjectController.store')
    .validator('Project')
    .middleware('can:create-projects')
  Route.put('/api/projects/:id', 'ProjectController.update')
    .validator('Project')
    .middleware('can:create-projects')
  Route.delete('/api/projects/:id', 'ProjectController.destroy')

  // Member
  Route.get('/api/members', 'MemberController.index')
  Route.put('/api/members/:id', 'MemberController.update').middleware('is:admin')

  // Permission
  Route.get('/api/permissions', 'PermissionController.show')
}).middleware(['auth', 'team'])
