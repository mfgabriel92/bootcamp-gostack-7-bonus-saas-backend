'use strict'

const User = use('App/Models/User')
const Kue = use('Kue')
const Job = use('App/Jobs/InvitationEmail')
const InvitationHook = (exports = module.exports = {})

InvitationHook.sendInvitationEmail = async invitation => {
  const { email } = invitation
  const invited = await User.findBy('email', email)

  if (!invited) {
    const user = await invitation.user().fetch()
    const team = await invitation.team().fetch()

    return Kue.dispatch(Job.key, { user, team, email }, { attempts: 7 })
  }

  await invited.teams().attach(invitation.team_id)
}
