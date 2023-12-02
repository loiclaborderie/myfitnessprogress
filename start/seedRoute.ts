import Route from '@ioc:Adonis/Core/Route'
import { ExerciseFactory } from 'Database/factories/exerciseFactory'
import { MuscleGroupFactory } from 'Database/factories/muscleGroupFactory'
import { UserFactory } from 'Database/factories/userFactory'
import { ExerciseCategoryFactory } from 'Database/factories/categoryFactory'
import { exerciseCategories } from 'App/data/raw/exerciseCategory'
import { muscleGroupArray } from 'App/data/raw/muscleGroupArray'



const exerciseCategoryObj = exerciseCategories.map((category) => {
    return {
        name: category,
    }
})

export const seedRoute = () => {
    Route.get('/seed', async () => {
        const users = await UserFactory.createMany(30)
        const muscleGroups = await MuscleGroupFactory.merge(muscleGroupArray).createMany(muscleGroupArray.length)
        const exerciseCategories = await ExerciseCategoryFactory.merge(exerciseCategoryObj).createMany(exerciseCategoryObj.length)
        const exercises = await ExerciseFactory.createMany(100)
        return 'seeded';
    })

}