import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Exercise from './Exercise'

export default class MuscleGroup extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public muscleGroup: string

  @column()
  public imageUrl: string | null

  @column()
  public description: string | null

  @manyToMany(() => Exercise)
  public exercises: ManyToMany<typeof Exercise>
}
