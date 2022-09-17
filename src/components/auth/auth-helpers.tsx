import firebase from 'firebase';
import { authMessages } from '../../constants/auth';
import { auth } from '../../services/firebase';

export async function continueWithFacebook({
  displayErrorMessage,
  redirect,
}: any) {
  const facebook = new firebase.auth.FacebookAuthProvider();
  continueWithProvider({ provider: facebook, displayErrorMessage, redirect });
}
export async function continueWithGoogle({ displayErrorMessage }: any) {
  const google = new firebase.auth.GoogleAuthProvider();
  continueWithProvider({ provider: google, displayErrorMessage });
}
export async function continueWithTwitter({ displayErrorMessage }: any) {
  const twitter = new firebase.auth.TwitterAuthProvider();
  continueWithProvider({ provider: twitter, displayErrorMessage });
}

async function continueWithProvider({ provider, displayErrorMessage }: any) {
  try {
    // const result =
    await firebase.auth().signInWithPopup(provider);
    /** @type {firebase.auth.OAuthCredential} */
    // const credential =
    //   (result?.credential as firebase.auth.OAuthCredential) ?? null;

    // This gives you a Google Access Token. You can use it to access the Google API.
    // const token = credential?.accessToken ?? null;

    // The signed-in user info.
    // const user = result.user;
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error?.code ?? '';
    // const errorMessage = error?.message ?? '';
    // We want to display the error message to the UI
    errorCode && displayErrorMessage(errorCode);
    // The email of the user's account used.
    // const email = error?.email ?? '';
    // The firebase.auth.AuthCredential type that was used.
    // const credential = error?.credential ?? '';
    // ...
  }
}

export function formatErrorMessage(errorCode: any): string {
  let message = '';
  switch (errorCode) {
    case authMessages.ACCOUNT_EXISTS:
      message = 'accountAlreadyExists';
      break;
    default:
      message = 'pleaseTryAgain';
      break;
  }
  return message;
}

type RequestCaptchaProps = {
  elementId: String;
  callback: Function;
};
export async function requestCaptcha({
  elementId,
  callback,
}: RequestCaptchaProps) {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(elementId, {
    size: 'invisible',
    callback: (response: any) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // handle response
      callback(response);
    },
  });
}

type ContinueWithPhoneProps = {
  phoneNumber: string;
  appVerifier: any;
  displayErrorMessage: any;
};

export async function sendCodeToPhone({
  phoneNumber,
  appVerifier,
  displayErrorMessage,
}: ContinueWithPhoneProps) {
  try {
    const confirmationResult = await firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier);
    return confirmationResult;
  } catch (err) {
    displayErrorMessage(err);
  }
}

export async function checkPhoneCode(confirmationResult: any, code: any) {
  try {
    const result = await confirmationResult.confirm(code);
    const user = result?.user ?? null;
    return user;
  } catch (err) {}
}

export async function setUsername() {
  const user = auth?.currentUser ?? null;

  // if(user){
  //   user.updateProfile({
  //     displayName

  //   })
  // }
}

// export async function createAccount(){
//   auth.createUserWithEmailAndPassword()
// }
