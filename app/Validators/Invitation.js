'use strict'

class Invitation {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      emails: 'required|email|array',
      'emails.*': 'required|email'
    }
  }
}

module.exports = Invitation
