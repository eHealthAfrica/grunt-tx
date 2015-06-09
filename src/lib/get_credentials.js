const nodeInquirer = require('inquirer')
const nodeKeytar = require('keytar')

const isPresent = function(attribute) {
  return function(value) {
    if (value && value.length > 1) {
      return true
    } else {
      return `${attribute} is a required property`
    }
  }
}

class Credentials {
  keyForUsername = 'grunt-tx:username'
  keyForPassword = 'grunt-tx:password'

  constructor({project, inquirer = nodeInquirer, keytar = nodeKeytar}) {
    this.project = project
    this.inquirer = inquirer
    this.keytar = keytar
  }

  async askFor(attribute, message) {
    const questions = [{
      name: attribute,
      type: 'input',
      message: message,
      validate: isPresent(attribute)
    }]

    return new Promise(resolve => {
      this.inquirer.prompt(questions, answers => {
        resolve(answers[attribute])
      })
    })
  }

  async getUsername() {
    if (process.env.TRANSIFEX_USER) {
      return process.env.TRANSIFEX_USER
    }

    let username = this.keytar.getPassword(this.keyForUsername, this.project)
    if (username) {
      return username
    }

    username = await this.askFor('username', `What is the username for ${this.project} on Transifex?`)
    this.keytar.addPassword(this.keyForUsername, this.project, username)
    return username
  }

  async getPassword() {
    if (process.env.TRANSIFEX_PASSWORD) {
      return process.env.TRANSIFEX_PASSWORD
    }

    let password = this.keytar.getPassword(this.keyForPassword, this.project)
    if (password) {
      return password
    }

    password = await this.askFor('password', `What is the password for ${this.project} on Transifex?`)
    this.keytar.addPassword(this.keyForPassword, this.project, password)
    return password
  }
}

module.exports = async function({project, inquirer, keytar}) {
  const credentials = new Credentials({project, inquirer, keytar})

  return {
    username: await credentials.getUsername(),
    password: await credentials.getPassword()
  }
}
