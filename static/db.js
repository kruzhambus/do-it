import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCAUM5u2Uy_g073jpVliG0PKDitH-R13U4",
  authDomain: "do-it-9ade6.firebaseapp.com",
  databaseURL: "https://do-it-9ade6-default-rtdb.firebaseio.com",
  projectId: "do-it-9ade6",
  storageBucket: "do-it-9ade6.appspot.com",
  messagingSenderId: "633920591940",
  appId: "1:633920591940:web:5a77d0471047cfc96bc411",
  measurementId: "G-4JZ0THJMQD"
};

export default getDatabase(initializeApp(firebaseConfig))