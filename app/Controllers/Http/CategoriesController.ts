import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { schema } from '@ioc:Adonis/Core/Validator'

    const categorySchema = schema.create({
        name: schema.string(),
        description: schema.string.optional()
    })

export default class CategoriesController {
    public async index({response}: HttpContextContract) {
        const categories = await Category.all()
        return response.status(200).json({ categories })
    }

    public async store({request, response}: HttpContextContract) {
        const categoryPayload = await request.validate({schema: categorySchema})
        const newCategory = await Category.create(categoryPayload)
        return response.status(201).json({ newCategory })
    }

    public async show({params, response}: HttpContextContract) {
        const id = params.id
        const category = await Category.find(id)
        if (!category) {
            return response.status(404).json({ message: 'Category not found' })
        }
        return response.status(200).json({ category })
    }

    public async update({request, response, params}: HttpContextContract) {
        const id = params.id
        const categoryPayload = await request.validate({schema: categorySchema})
        const category = await Category.find(id)
        if (!category) {
            return response.status(404).json({ message: 'Category not found' })
        }
        category.merge(categoryPayload)
        await category.save()
        return response.status(200).json({ category })
    }

    public async destroy({response, params}: HttpContextContract) {
        const id = params.id
        const category = await Category.find(id)
        if (!category) {
            return response.status(404).json({ message: 'Category not found' })
        }
        await category.delete()
        return response.status(204).json({ message: 'Category deleted' })
    }
}
