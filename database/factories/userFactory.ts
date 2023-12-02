import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    // Define user properties using faker or static values
    email: faker.internet.email(),
    height: faker.datatype.number({ min: 100, max: 230 }),
    weight: faker.datatype.number({ min: 30, max: 170 }),
    password: 'test',
    // Add other user properties here
  }
}).build()