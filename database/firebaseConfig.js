import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCVfxDW6aHOWmjcQj94aKIXzLPRaMx_CSg",
  authDomain: "info6132lab2-e8185.firebaseapp.com",
  databaseURL: "https://info6132lab2-e8185-default-rtdb.firebaseio.com",
  projectId: "info6132lab2-e8185",
  storageBucket: "info6132lab2-e8185.appspot.com",
  messagingSenderId: "785994566871",
  appId: "1:785994566871:web:85f923850385e7978eb492"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
