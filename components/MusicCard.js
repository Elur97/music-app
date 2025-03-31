import { useState, useEffect, useRef } from "react";
import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function MusicCard({ bookmarkedPosts }) {  // propsでbookmarkedPostsを受け取る
  const router = useRouter();

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      const bookmarkDocRef = doc(db, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkDocRef);
      alert("ブックマークを削除しました！");
    } catch (error) {
      console.error("削除エラー:", error.message);
    }
  };

  return (
    <div className="p-4 space-y-5 ">
      <h2 className="text-4xl font-bold text-black">ブックマーク一覧</h2>
      {/* カードを横並びにするコンテナ */}
      <div className=" space-x-6  ">
        {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col w-370 border p-4 rounded-md bg-white "
            >
              <h4>{post.title}</h4>
              <p>{post.comment}</p>
              <p>{post.artist?.name || "アーティスト未選択"}</p>
              {post.artist?.imageUrl && (
                <img
                  src={post.artist.imageUrl}
                  alt={post.artist.name}
                  className="w-20 h-20 rounded-full mt-2"
                />
              )}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {post.url}
              </a>
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteBookmark(post.id)}
                  className="ml-340 w-20 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>ブックマークはありません。</p>
        )}
      </div>
      <button
        onClick={() => router.push("/")}
        className="ml-170 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded mt-4"
      >
        ホームに戻る
      </button>
    </div>
  );
}
