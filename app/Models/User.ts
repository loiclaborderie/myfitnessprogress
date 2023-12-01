import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Token from './Token'
import Exercise from './Exercise'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public height: number

  @column()
  public weight: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Exercise)
  public exercises: HasMany<typeof Exercise>

  @hasMany(() => Token, {
    onQuery: (query) => {
      query.where('type', 'PASSWORD_RESET')
    },
  })
  public passwordResetTokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
