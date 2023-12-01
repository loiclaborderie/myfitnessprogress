import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Token from 'App/Models/Token'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class PasswordResetController {
  public async send({ request, response }: HttpContextContract) {
    const emailSchema = schema.create({
      email: schema.string([rules.email()]),
    })
    const { email } = await request.validate({ schema: emailSchema })
    const user = await User.findBy('email', email)
    const token = await Token.generatePasswordResetToken(user)
    console.log(user, token)
    if (user) {
      await Mail.send((message) => {
        message
          .from(Env.get('SMTP_USERNAME'))
          .to(user.email)
          .subject('Reset your password')
          .html(
            `Reset your password by <a href="${Env.get(
              'DOMAIN'
            )}/reset-password/${token}">clicking here</a>.`
          )
      })
    }
    return response.status(200).send({ message: 'Password reset link sent' })
  }
  public async reset({ response, params }: HttpContextContract) {
    const token = params.token
    const isValid = await Token.verify(token)

    if (!isValid) {
      return response.status(400).send({ message: 'Invalid token' })
    }
    return response.status(200).send({ message: 'Valid token' })
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const passwordSchema = schema.create({
      token: schema.string(),
      password: schema.string({}, [rules.minLength(8)]),
    })
    const { token, password } = await request.validate({ schema: passwordSchema })
    const user = await Token.getPasswordResetUser(token)
    if (!user) {
      return response.status(400).send({ message: 'Invalid token' })
    }
    await user.merge({ password }).save()
    await auth.login(user)
    await Token.expirePasswordResetToken(user)
    response.status(200).send({ message: 'Password updated' })
  }
}
