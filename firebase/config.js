import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9n2VJ9cnUxQ_II9Oth5SfzcDg8yguP_A",
  authDomain: "react-native-app-69b9e.firebaseapp.com",
  projectId: "react-native-app-69b9e",
  storageBucket: "react-native-app-69b9e.appspot.com",
  messagingSenderId: "834050434631",
  appId: "1:834050434631:web:05b5078fbbac09e22e3362"
};

const db = initializeApp(firebaseConfig);

export default db;