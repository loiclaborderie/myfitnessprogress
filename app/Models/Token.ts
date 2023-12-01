import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number | null

  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64)

    if (!user) return token

    await this.expirePasswordResetToken(user)
    const record = await user.related('passwordResetTokens').create({
      token,
      type: 'PASSWORD_RESET',
      expiresAt: DateTime.local().plus({ hour: 1 }),
    })

    return record.token
  }

  public static async expirePasswordResetToken(user: User) {
    await user.related('passwordResetTokens').query().update({ expiresAt: DateTime.now().toSQL() })
  }

  public static async getPasswordResetUser(token: string) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('expiresAt', '>', DateTime.now().toString())
      .orderBy('createdAt', 'desc')
      .first()
    return record?.user
  }

  public static async verify(token: string) {
    const record = await this.query()
      .where('token', token)
      .where('expiresAt', '>', DateTime.now().toString())
      .first()

    return !!record
  }
}
