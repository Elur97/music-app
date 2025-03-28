"use client";
import Link from "next/link";
import { auth } from "@/firebase/firebase";

export default function Header() {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <header className="flex justify-between p-4 bg-gray-800 text-white">
      <div className="space-x-4">
        <Link href="/music" className="hover:underline">ホーム</Link>
        <Link href="/music/bookmarks" className="hover:underline">お気に入り</Link>
        <Link href="/music/profile" className="hover:underline">プロフィール</Link>
      </div>
      <div className="space-x-4">
        {auth.currentUser ? (
          <>
            <span>{auth.currentUser.displayName || "ユーザー"}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              ログアウト
            </button>
          </>
        ) : (
          <>
            <Link href="/music/login" className="hover:underline">ログイン</Link>
            <Link href="/music/register" className="hover:underline">新規登録</Link>
          </>
        )}
      </div>
    </header>
  );
}