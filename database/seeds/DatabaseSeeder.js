'use strict'

const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123123'
    })

    await user.teams().create({
      name: 'Lorem Ipsum',
      user_id: user.id
    })
  }
}

module.exports = DatabaseSeeder
