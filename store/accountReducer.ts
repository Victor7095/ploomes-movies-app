// action - state management
import persistReducer from "redux-persist/es/persistReducer";
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

type Action = {
  type: string;
  payload?: any;
};

const accountReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    case LOGIN: {
      console.log("LOGIN")
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null,
      };
    }
    case UPDATE_PROFILE: {
      const { user } = action.payload;
      return {
        ...state,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const persistConfig = {
  key: "account",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, accountReducer);

export default persistedReducer;
