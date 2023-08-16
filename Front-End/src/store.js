import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import rootReducer from './reducers/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
