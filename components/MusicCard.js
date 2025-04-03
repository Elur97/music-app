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
    <div className="p-4 md:space-y-5 md:w-380 w-85 cd:mr-0 mr-14">
      <h2 className="md:text-4xl text-2xl font-bold md:ml-0  text-black">ブックマーク一覧</h2>
        <div className=" md:space-x-6  ">
        {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:w-370  w-90 xl:ml-0   border p-4 rounded-md bg-white "
            >
              <h4 className="md:ml-0  font-bold ">{post.title}</h4>
              <p className="md:w-370 ">{post.comment}</p>
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
              <div className="mt-2 text-center ">
                <button
                  onClick={() => handleDeleteBookmark(post.id)}
                  className="xl:ml-340 xl:w-20 w-30 h-10 text-center bg-red-500 text-white xl:px-4 xl:py-2 rounded"
                >
                  削除
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
        className="md:ml-170 ml-33 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded mt-4"
      >
        ホームに戻る
      </button>
    </div>
  );
}
