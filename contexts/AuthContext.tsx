import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc, DocumentReference, DocumentData, getDoc, doc, DocumentSnapshot } from "firebase/firestore";

// action - state management
import { LOGIN, LOGOUT } from "../store/actions";
import accountReducer from "../store/accountReducer";
import { auth, db } from "../firebaseConfig";

// initialState
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //
type FirebaseContextType = {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: any;
  firebaseEmailPasswordSignIn: (
    email: string,
    password: string
  ) => Promise<{
    authData: UserCredential;
    userDocument: any;
  }>;
  firebaseRegister: (username: string, email: string, password: string) => Promise<{
    authData: UserCredential;
    userDocument: DocumentReference<DocumentData>;
  }>;
  login: (email: string, password: string) => Promise<{
    authData: UserCredential;
    userDocument: any;
  }>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updateProfile: () => void;
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) {
      // Temporary fix for router not being ready.
      return;
    }

    const inAuthGroup = segments.length === 0 || segments[0] === "register";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/home");
    }
  }, [user, segments]);
}

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                id: user.uid,
                email: user.email,
                name: user.displayName || "John Doe",
              },
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      }),
    []
  );

  useProtectedRoute(state.user);

  const firebaseEmailPasswordSignIn = async (email: string, password: string) =>{
    const authData = await signInWithEmailAndPassword(auth, email, password);
    const userDocument = {};
    return {
      authData,
      userDocument,
    };
  }

  const firebaseRegister = async (username: string, email: string, password: string) => {
    const authData = await createUserWithEmailAndPassword(auth, email, password);
    const userDocument = await addDoc(collection(db, "users"), {
      username,
      email,
    });
    return {
      authData,
      userDocument,
    };
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfile = () => {};
  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <ActivityIndicator />;
  }

  return (
    <FirebaseContext.Provider
      value={{
        ...state,
        firebaseRegister,
        firebaseEmailPasswordSignIn,
        login: firebaseEmailPasswordSignIn,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

export default FirebaseContext;
