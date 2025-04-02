"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //登録済みのemailとパスワードによるユーザー認証
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/music");  // ログイン後、音楽投稿ページへ遷移
    } catch (error) {
      console.error("ログインエラー:", error.message);
    }
  };

  //ユーザー認証画面のレイアウト
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: 'url("/images/white_00115.jpg")' }}>
      <h2 className="text-7xl font-bold mb-18 text-black">Sign In</h2>
      <p className="text-3xl font-bold mb-4 text-black ">サインアップの際に使用したメールアドレスとパスワードを入力してください。</p>
      <form onSubmit={handleLogin} className="border p-20 bg-white bg-opacity-60 rounded-lg shadow-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="border mr-3 p-2 mb-4 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className=" border mr-3 p-2 mb-4 rounded w-full"
        />
        
        {/*ログイン確認ボタン*/}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-700 w-full">
          ログイン
        </button>

      </form>
    </div>
  );
}
