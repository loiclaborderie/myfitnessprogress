import ExerciseCategory from 'App/Models/Category';
import Factory from '@ioc:Adonis/Lucid/Factory'

export const ExerciseCategoryFactory = Factory.define(ExerciseCategory, ({ faker }) => {
  return {
    // Define user properties using faker or static values
    name: faker.lorem.words(1),
    description: faker.lorem.words(5),
  }
}).build()