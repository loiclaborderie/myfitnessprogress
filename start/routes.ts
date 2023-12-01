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

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware('auth')

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
  Route.post('/', 'ExercisesController.store')
  Route.put('/:id', 'ExercisesController.update')
  Route.delete('/:id', 'ExercisesController.destroy')
}).prefix('/exercise')