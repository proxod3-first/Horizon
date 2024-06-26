import { combineReducers } from 'redux';

import hotels from './hotels.js'
import auth from './auth.js'
import users from './users.js'
import rooms from './rooms.js'
import roomRequests from './roomRequests.js'
import tenants from './tenants.js'
import reviews from './reviews.js'
import complaints from './complaints.js'
export const reducers = combineReducers({ auth,hotels,users,rooms,roomRequests,tenants,reviews,complaints });