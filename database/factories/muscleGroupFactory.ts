import MuscleGroup from 'App/Models/MuscleGroup';
import Factory from '@ioc:Adonis/Lucid/Factory'

export const MuscleGroupFactory = Factory.define(MuscleGroup, ({ faker }) => {
  return {
    // Define user properties using faker or static values
    name: faker.lorem.words(1),
    description: faker.lorem.words(5),
    imageUrl: faker.image.imageUrl(),
    // Add other user properties here
  }
}).build()