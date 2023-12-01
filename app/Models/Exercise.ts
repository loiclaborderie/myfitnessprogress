import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { ExerciseDifficulty, ExerciseType } from 'App/types/exerciseEnums'
import MuscleGroup from './MuscleGroup'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public imageUrl: string | null

  @column()
  public videoUrl: string | null

  @column()
  public difficulty: ExerciseDifficulty

  @column()
  public type: ExerciseType

  @column()
  public instructions: string | null

  @manyToMany(() => MuscleGroup)
  public muscleGroups: ManyToMany<typeof MuscleGroup>

  // @manyToMany(() => Category)
  // public categories: ManyToMany<typeof Categories>

  // @manyToMany(() => Equipment)
  // public equipmentNeeded: ManyToMany<typeof Equipment>
}
