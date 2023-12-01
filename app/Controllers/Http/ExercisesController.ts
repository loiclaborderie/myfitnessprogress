import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { ExerciseDifficulty, ExerciseType } from 'App/types/exerciseEnums';
import Exercise from 'App/Models/Exercise'

const exerciseSchema = schema.create({
    name: schema.string(),
    description: schema.string(),
    imageUrl: schema.string.optional(),
    videoUrl: schema.string.optional(),
    difficulty: schema.enum(Object.values(ExerciseDifficulty)),
    type: schema.enum.optional(Object.values(ExerciseType)),
    instructions: schema.string.optional(),
    muscleGroups: schema.array.optional().members(schema.number())
})

export default class ExercisesController {
    public async index({response}: HttpContextContract) {
        const exercises = await Exercise.all()
        return response.status(200).json({exercises})
    }
    
    public async store({request, response}: HttpContextContract) {
        const exercisePayload = await request.validate({schema: exerciseSchema})
        const { muscleGroups, ...exerciseData } = exercisePayload
        
        const newExercise = await Exercise.create(exerciseData)

        if (muscleGroups && muscleGroups.length > 0) {
            await newExercise.related('muscleGroups').attach(muscleGroups)
        }

        return response.status(201).json({newExercise})
    }
    
    public async show({params, response}: HttpContextContract) {
        const id = params.id
        const exercise = await Exercise.find(id)
        if (!exercise) {
            return response.status(404).json({ message: 'Exercise not found' })
        }
        return response.status(200).json({exercise})
    }
    
    public async update({request, response, params}: HttpContextContract) {
        const id = params.id
        const payload = await request.validate({
            schema: exerciseSchema,
        })
        const exercise = await Exercise.find(id)
        if (!exercise) {
            return response.status(404).json({ message: 'Exercise not found' })
        }
        const updatedExercise = await exercise.merge(payload).save()
        return response.status(200).json({updatedExercise})
    }
    
    public async destroy({params, response}: HttpContextContract) {
        const id = params.id
        const exercise = await Exercise.find(id)
        if (!exercise) {
            return response.status(404).json({ message: 'Exercise not found' })
        }
        await exercise.delete()
        return response.status(200).json({message: 'Exercise deleted'})
    }
}
