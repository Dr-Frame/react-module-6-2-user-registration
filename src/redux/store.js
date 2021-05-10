import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import {
  //два импорта для локалстораджа
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
//нужно брать єтот импорт (их сторадж)что бы работало все
import storage from 'redux-persist/lib/storage';
import { todosReducer } from './todos';
import { authReducer } from './auth';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // logger,
];

//пишем конфигурацию для локалстораджа ауз
//в вайтлист ставим то, что нам нужно отображать в сторадже(только токен пользователя)
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    //в ауз делаем локалсторадж, так как там нужно будет сохранять токен
    auth: persistReducer(authPersistConfig, authReducer),
    todos: todosReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

//єта часть отвечает за локал сторадж в редаксе
const persistor = persistStore(store);

export default { store, persistor };
