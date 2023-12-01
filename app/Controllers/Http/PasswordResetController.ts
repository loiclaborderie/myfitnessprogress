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
      console.log('sending email')
      const mailSent = await Mail.send((message) => {
        message
          .from('l.laborderie-boulou@tbs-education.org')
          .to('66labetedesexe@gmail.com')
          .subject('Reset your password')
          .html(
            `Reset your password by <a href="${Env.get(
              'DOMAIN'
            )}/reset-password/${token}">clicking here</a>.`
          )
      })
      console.log(mailSent)
    }
    return response
      .status(200)
      .send({ message: user ? 'Password reset link sent' : 'User not found' })
  }
  public async reset({ response, params }: HttpContextContract) {
    const token = params.token
    const isValid = await Token.verify(token)

    if (!isValid) {
      return response.status(400).send({ message: 'Invalid token' })
    }
    return response.status(200).send({ token })
  }

  public async store({ request, response }: HttpContextContract) {
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
    response.status(200).send({ message: 'Password updated' })
  }
}
