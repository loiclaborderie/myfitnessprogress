import Exercise from 'App/Models/Exercise';
import Factory from '@ioc:Adonis/Lucid/Factory'
import { ExerciseDifficulty } from 'App/types/exerciseEnums'
import {muscleGroupArray} from 'App/data/raw/muscleGroupArray'
import {exerciseCategories} from 'App/data/raw/exerciseCategory'

export const ExerciseFactory = Factory.define(Exercise, async ({ faker }) => {
    const exercise = {
        name: faker.lorem.words(1),
        description: faker.lorem.words(5),
        imageUrl: faker.image.imageUrl(),
        difficulty: faker.helpers.enumValue(ExerciseDifficulty),
        instructions: faker.lorem.words(10),
        category_id: faker.datatype.number({ min: 1, max: exerciseCategories.length })
    }    
    const exerciseInstance = await Exercise.create(exercise);
    
    const muscleGroups: number[] = []
    const numMuscleGroups = faker.datatype.number({ min: 1, max: 4 });
    for (let i = 0; i < numMuscleGroups; i++) {
        const muscleGroupId = faker.datatype.number({ min: 1, max: muscleGroupArray.length });
        muscleGroups.push(muscleGroupId);
    }
    
    await exerciseInstance.related('muscleGroups').attach(muscleGroups);
    return exerciseInstance 
}).build()