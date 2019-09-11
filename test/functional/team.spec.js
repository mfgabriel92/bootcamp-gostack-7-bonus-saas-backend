'use strict'

const { test, trait } = use('Test/Suite')('Team')
const User = use('App/Models/User')
const Team = use('App/Models/Team')

trait('Test/ApiClient')
trait('Auth/Client')

test('Should fetch all teams', async ({ client }) => {
  const user = await User.find(1)
  await Team.createMany([
    {
      name: 'Test Team A',
      user_id: 1
    },
    {
      name: 'Test Team B',
      user_id: 1
    }
  ])

  const response = await client
    .get('/api/teams')
    .accept('json')
    .loginVia(user)
    .end()

  response.assertStatus(200)
})

test('Should create one team', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .post('/api/teams')
    .type('json')
    .loginVia(user)
    .send({
      name: 'New Team Test'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'New Team Test'
  })
})

test('Should update one team', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .put('/api/teams/1')
    .type('json')
    .loginVia(user)
    .send({
      name: 'Updated Team Test'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: 1,
    name: 'Updated Team Test'
  })
})

test('Should delete one team', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .delete('/api/teams/1')
    .loginVia(user)
    .end()

  response.assertStatus(204)
})

test('Should warn missing mandatory fields', async ({ client }) => {
  const user = await User.find(1)
  const response = await client
    .post('/api/teams')
    .header('conent-type', 'application/json')
    .accept('json')
    .loginVia(user)
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'required validation failed on name'
    }
  ])
})
