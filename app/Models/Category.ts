import { BaseModel, hasMany, column, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Exercise from './Exercise'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string | null

  @hasMany(() => Exercise)
  public exercises: HasMany<typeof Exercise>
}
