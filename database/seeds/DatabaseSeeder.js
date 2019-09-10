'use strict'

const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123123123'
    })

    const createInvitations = await Permission.create({
      slug: 'create-invitations',
      name: 'Invite Members'
    })

    const createProjects = await Permission.create({
      slug: 'create-projects',
      name: 'Create Projects'
    })

    const adminRole = await Role.create({
      slug: 'admin',
      name: 'Administrator'
    })

    const moderatorRole = await Role.create({
      slug: 'moderator',
      name: 'Moderator'
    })

    await Role.create({
      slug: 'guest',
      name: 'Guest'
    })

    await adminRole.permissions().attach([createInvitations.id, createProjects.id])
    await moderatorRole.permissions().attach([createProjects.id])

    const team = await user.teams().create({
      name: 'Lorem Ipsum',
      user_id: user.id
    })

    const joinedTeams = await user
      .joinedTeams()
      .where('team_id', team.id)
      .first()

    await joinedTeams.roles().attach([adminRole.id])
  }
}

module.exports = DatabaseSeeder
