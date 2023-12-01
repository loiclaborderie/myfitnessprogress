import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import MuscleGroup from 'App/Models/MuscleGroup'


const muscleGroupSchema = schema.create({
    name: schema.string(),
    description: schema.string.optional(),
    imageUrl: schema.string.optional(),
})

export default class MuscleGroupsController {
    public async index({response}: HttpContextContract) {
        const muscleGroups = await MuscleGroup.all()
        return response.status(200).json({muscleGroups})
    }
    
    public async store({request, response}: HttpContextContract) {
        const muscleGroup = await request.validate({schema: muscleGroupSchema})
        const newMuscleGroup = await MuscleGroup.create(muscleGroup)
        return response.status(201).json({newMuscleGroup})
    }
    
    public async show({params, response}: HttpContextContract) {
        const id = params.id
        const muscleGroup = await MuscleGroup.find(id)
        if (!MuscleGroup) {
            return response.status(404).json({ message: 'uscleGroup not found' })
        }
        return response.status(200).json({muscleGroup})
    }
    
    public async update({request, response, params}: HttpContextContract) {
        const id = params.id
        const payload = await request.validate({
            schema: muscleGroupSchema,
        })
        const muscleGroup = await MuscleGroup.find(id)
        if (!muscleGroup) {
            return response.status(404).json({ message: 'muscleGroup not found' })
        }
        const updatedMuscleGroup = await muscleGroup.merge(payload).save()
        return response.status(200).json({updatedMuscleGroup})
    }
    
    public async destroy({params, response}: HttpContextContract) {
        const id = params.id
        const muscleGroup = await MuscleGroup.find(id)
        if (!muscleGroup) {
            return response.status(404).json({ message: 'muscleGroup not found' })
        }
        await muscleGroup.delete()
        return response.status(200).json({message: 'muscleGroup deleted'})
    }
}
