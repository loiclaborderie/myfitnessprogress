/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import {seedRoute} from './seedRoute'

Route.get('/', async () => {
 return { hello: 'world' }
})

seedRoute()
Route.post('/register', 'UsersController.register')
Route.post('/forgot-password', 'PasswordResetController.send')
Route.get('/reset-password/:token', 'PasswordResetController.reset')
Route.post('/reset-password', 'PasswordResetController.store')
Route.post('/login', 'UsersController.login')
Route.put('/users/:id', 'UsersController.update').middleware('auth')
Route.delete('/users/:id', 'UsersController.destroy').middleware('auth')


Route.group(() => {
  Route.get('/', 'ExercisesController.index')
  Route.get('/:id', 'ExercisesController.show')
  Route.get('/byMuscle/:id', 'ExercisesController.getExercisesByMuscleGroup')
  Route.get('/category/:id', 'ExercisesController.getExercisesByCategory')
  Route.post('/', 'ExercisesController.store').middleware('auth')
  Route.put('/:id', 'ExercisesController.update').middleware('auth')
  Route.delete('/:id', 'ExercisesController.destroy').middleware('auth')
}).prefix('/exercise')

Route.group(() => {
  Route.get('/', 'MuscleGroupsController.index')
  Route.get('/:id', 'MuscleGroupsController.show')
  Route.post('/', 'MuscleGroupsController.store').middleware('auth')
  Route.put('/:id', 'MuscleGroupsController.update').middleware('auth')
  Route.delete('/:id', 'MuscleGroupsController.destroy').middleware('auth')
}).prefix('/muscle-group')