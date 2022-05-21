import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import db from "../../firebase/config";

const auth = getAuth();

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await updateProfile(user, { displayName: nickname });

      const { uid, displayName } = await auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        nickname: displayName,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };

      dispatch(
        authSlice.actions.authStateChange({
          stateChange: true,
        })
      );

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};
