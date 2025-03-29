import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyA9yGt9PBlBeRBjLoWoo8y-Pd85eZj8YeQ",
  authDomain: "music-app-27760.firebaseapp.com",
  projectId: "music-app-27760",
  storageBucket: "music-app-27760.appspot.com", // ✅ 修正
  messagingSenderId: "257297664897",
  appId: "1:257297664897:web:01627a6b22fde1d06bf680",
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === "failed-precondition") {
      console.error("複数のタブで開いているため永続化が無効になっています。");
    } else if (err.code === "unimplemented") {
      console.error("このブラウザでは Firestore の永続化がサポートされていません。");
    }
  });

export { db };
