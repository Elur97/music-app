import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { doc, deleteDoc } from "firebase/firestore";


export default function BookmarksPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "bookmarks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setBookmarkedPosts((prev) => [...prev, { ...change.doc.data(), id: change.doc.id }]);
        }
        if (change.type === "modified") {
          setBookmarkedPosts((prev) =>
            prev.map((post) =>
              post.id === change.doc.id ? { ...change.doc.data(), id: change.doc.id } : post
            )
          );
        }
        if (change.type === "removed") {
          setBookmarkedPosts((prev) => prev.filter((post) => post.id !== change.doc.id));
        }
      });
    });

    return () => unsubscribe();
  }, []);

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
    <div className="p-4 space-y-4 min-h-screen">
      <h2 className="text-3xl font-bold text-black">ブックマーク一覧</h2>
      <div className="space-y-3">
        {bookmarkedPosts.map((post) => (
          <div key={post.id} className="flex flex-col w-370 border p-4 rounded-md bg-white">
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
            <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
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
        ))}
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
