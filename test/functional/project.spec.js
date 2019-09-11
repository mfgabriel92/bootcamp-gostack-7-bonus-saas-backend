'use strict'

const { test, trait } = use('Test/Suite')('Project')
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('Should not be authorized to fetch projects if no team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .get('/api/projects')
    .accept('json')
    .loginVia(user)
    .end()

  response.assertStatus(401)
})

test('Should fetch projects if a team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .get('/api/projects')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('Should not be authorized to create projects if no team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .post('/api/projects')
    .accept('json')
    .loginVia(user)
    .send({
      title: 'Not created project'
    })
    .end()

  response.assertStatus(401)
})

test('Should create projects if a team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .post('/api/projects')
    .header('conent-type', 'application/json')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .send({
      title: 'Test Project'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    title: 'Test Project'
  })
})

test('Should not be authorized to fetch a specific project if no team is specified', async ({
  client
}) => {
  const user = await User.find(1)
  const response = await client
    .get('/api/projects/1')
    .accept('json')
    .loginVia(user)
    .end()

  response.assertStatus(401)
})

test('Should fetch a specific project if a team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .get('/api/projects/1')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    title: 'Test Project'
  })
})

test('Should not be authorized to update projects if no team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .put('/api/projects/1')
    .accept('json')
    .loginVia(user)
    .send({
      title: 'Not updated project'
    })
    .end()

  response.assertStatus(401)
})

test('Should update projects if a team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .put('/api/projects/1')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .send({
      title: 'Updated project'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    title: 'Updated project'
  })
})

test('Should not be authorized to delete projects if no team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .delete('/api/projects/1')
    .accept('json')
    .loginVia(user)
    .end()

  response.assertStatus(401)
})

test('Should delete projects if a team is specified', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .delete('/api/projects/1')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .end()

  response.assertStatus(204)
})

test('Should warn missing mandatory fields', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .post('/api/projects')
    .header('conent-type', 'application/json')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'required validation failed on title'
    }
  ])
})

test('Should not create a project if user does not have admin permissions', async ({ client }) => {
  const user = await User.create({
    name: 'Another User',
    email: 'anotheruser@gmail.com',
    password: 'anotherpassword'
  })

  await user.joinedTeams().create({
    user_id: user.id,
    team_id: 1
  })

  const response = await client
    .post('/api/projects')
    .header('conent-type', 'application/json')
    .accept('json')
    .header('team', 'lorem-ipsum')
    .loginVia(user)
    .send({
      title: 'Unauthorized Test Project'
    })
    .end()

  response.assertStatus(403)
  response.assertJSONSubset({
    message: 'Access forbidden. You are not allowed to this resource.'
  })
})
