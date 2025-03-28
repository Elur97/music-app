//ユーザー登録機能の実装

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/music");  // 登録成功後、音楽投稿ページへ遷移
    } catch (error) {
      console.error("登録エラー:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-4xl font-bold mb-4">Sign Up</h2>
      <p className=" text-3xl font-bold">Please enter your email and password.</p>
      <form onSubmit={handleRegister} className=" border-1 pl-10 pr-10 mt-7">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          className=" w-60 border mr-10 p-2 mb-40 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          className="w-60 border  mt-50 mr-5  p-2 rounded"
        />
        <button type="submit" className=" bg-blue-500 text-white px-3 py-2 rounded">
          Confirm
        </button>
      </form>
    </div>
  );
}