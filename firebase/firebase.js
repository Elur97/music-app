import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyA9yGt9PBlBeRBjLoWoo8y-Pd85eZj8YeQ",
  authDomain: "music-app-27760.firebaseapp.com",
  
  projectId: "music-app-27760",
  storageBucket: "music-app-27760.firebasestorage.app",
  messagingSenderId: "257297664897",
  appId: "1:257297664897:web:01627a6b22fde1d06bf680",
};

// firebase初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
