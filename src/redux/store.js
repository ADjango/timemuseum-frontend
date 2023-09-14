import { configureStore } from '@reduxjs/toolkit'
import { counterSlice, userCredentialSlice, loginModalSlice } from './actions'
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
};

const reducers = combineReducers({
    counter: counterSlice.reducer,
    userCredential: userCredentialSlice.reducer,
    loginModal: loginModalSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//     reducer: {
//         counter: counterSlice.reducer,
//         userCredential: userCredentialSlice.reducer
//     }
// })

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
