'use strict'

const { test, trait } = use('Test/Suite')('Session')

trait('Test/ApiClient')

test('Should warn missing mandatory fields', async ({ client }) => {
  const response = await client
    .post('/api/auth')
    .accept('json')
    .type('json')
    .send({})
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'required validation failed on email'
    },
    {
      message: 'required validation failed on password'
    }
  ])
})

test('Should generate a token for authenticated user', async ({ client }) => {
  const response = await client
    .post('/api/auth')
    .accept('json')
    .type('json')
    .send({
      email: 'johndoe@gmail.com',
      password: '123123123'
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })
})
