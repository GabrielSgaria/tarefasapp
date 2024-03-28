import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwlh793FJLQTpyvGgiUnONPBmApGy66rU",
  authDomain: "tarefasapp-555ef.firebaseapp.com",
  projectId: "tarefasapp-555ef",
  storageBucket: "tarefasapp-555ef.appspot.com",
  messagingSenderId: "217802745165",
  appId: "1:217802745165:web:012f172257a69850228304",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
