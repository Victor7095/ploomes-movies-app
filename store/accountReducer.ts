// action - state management
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "./actions";

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

export default accountReducer;
