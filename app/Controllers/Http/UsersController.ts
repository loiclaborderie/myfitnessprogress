import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const height = request.input('height')
    const weight = request.input('weight')

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.status(400).json({ error: 'User with this email already exists' })
    }

    await User.create({ email, password, height, weight })
    const apiToken = await auth.use('api').attempt(email, password)

    return response.status(201).json({ apiToken })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const apiToken = await auth.use('api').attempt(email, password)
    console.log(apiToken)
    return response.status(200).json({ apiToken })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.email = request.input('email')
    user.password = request.input('password')
    user.height = request.input('height')
    user.weight = request.input('weight')

    await user.save()

    return response.status(200).json({ message: 'User details updated successfully' })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.status(200).json({ message: 'User deleted successfully' })
  }
}
