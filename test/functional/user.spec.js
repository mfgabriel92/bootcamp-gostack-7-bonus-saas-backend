'use strict'

const { test, trait } = use('Test/Suite')('User')
const Invitation = use('App/Models/Invitation')

trait('Test/ApiClient')

test('Should not create a user that is not invited', async ({ client }) => {
  const response = await client
    .post('/api/users')
    .type('json')
    .send({
      name: 'Uninvited Guy',
      email: 'uninvitedguy@gmail.com',
      password: 'notinvited111'
    })
    .end()

  response.assertStatus(401)
  response.assertJSONSubset({
    message: 'You must be invited to a team before registering'
  })
})

test('Should create a user that is invited', async ({ client }) => {
  await Invitation.create({
    user_id: 1,
    team_id: 1,
    email: 'invitedguy@gmail.com'
  })

  const response = await client
    .post('/api/users')
    .type('json')
    .send({
      name: 'Invited Guy',
      email: 'invitedguy@gmail.com',
      password: 'invited111'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })
})

test('Should warn missing mandatory fields', async ({ client }) => {
  await Invitation.create({
    user_id: 1,
    team_id: 1,
    email: 'invitedguy@gmail.com'
  })

  const response = await client
    .post('/api/users')
    .accept('json')
    .type('json')
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'required validation failed on name'
    },
    {
      message: 'required validation failed on email'
    },
    {
      message: 'required validation failed on password'
    }
  ])
})
