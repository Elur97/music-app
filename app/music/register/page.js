"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // emailとパスワードによるユーザー認証
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // 登録成功後、ホーム画面へ遷移
    } catch (error) {
      console.error("登録エラー:", error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/images/white_00115.jpg")',
      }}
    >
      <h2 className="text-7xl font-bold mb-8 text-black">Sign Up</h2>
      <p className="text-3xl font-bold mb-4 text-black">
        このサイトで使用するメールアドレスとパスワードを入力してください
      </p>
      <form
        onSubmit={handleRegister}
        className="border p-20 bg-white bg-opacity-60 rounded-lg shadow-md max-w-md w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 w-full"
        >
          新規登録
        </button>
      </form>
      <style jsx>{`
        @media (max-width: 375px) {
          div {
            background-image: url("/images/white_00115_mobile.jpg");
            background-size: cover;
            background-position: center;
          }
        }
      `}</style>
    </div>
  );
}
