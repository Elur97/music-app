"use client";
import { auth } from "@/firebase/firebase";

export default function ProfilePage() {
  const user = auth.currentUser;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">プロフィール</h2>
      {user ? (
        <div className="space-y-2">
          <p>名前: {user.displayName}</p>
          <p>メール: {user.email}</p>
          <p>UID: {user.uid}</p>
        </div>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}