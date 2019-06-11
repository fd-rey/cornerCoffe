import "core-js/stable"
import "regenerator-runtime/runtime"
import auth from './auth'
import coffees from './coffees'
import orders from './orders'

export default (app) => {
  auth(app)
  coffees(app)
  orders(app)
}
