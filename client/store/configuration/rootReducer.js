import { combineReducers } from 'redux';
import mapReducer from '../entities/mapEntity';
import usersReducer from '../entities/userEntity';
import favoritesReducer from '../entities/favoritesEntity';

/*
This will combine our slice reducers into a single rootReducer that can be
handled by the configure store function which creates our store. We can optionally
tuck these behind an entities prop in our store by creating an entitiesReducer
layer between this and our actual slice reducers
*/

export default combineReducers({
  map: mapReducer,
  users: usersReducer,
  favorites: favoritesReducer,
});
