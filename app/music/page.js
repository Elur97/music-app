"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import PopularArtists from "@/components/PopularArtists";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const router = useRouter();

  // 投稿データの取得
  useEffect(() => {
    const q = query(collection(db, "music"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  // ブックマークされた投稿を取得
  useEffect(() => {
    const q = query(collection(db, "bookmarks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookmarkedData = [];
      querySnapshot.forEach((doc) => {
        bookmarkedData.push({ ...doc.data(), id: doc.id });
      });
      setBookmarkedPosts(bookmarkedData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "music"), {
        title,
        url,
        comment,
        userId: auth.currentUser?.uid,
        artist: selectedArtist,
        createdAt: new Date(),
      });
      setTitle("");
      setUrl("");
      setComment("");
      setSelectedArtist(null);
      alert("投稿完了！");
      router.push("/");
    } catch (error) {
      console.error("投稿エラー:", error.message);
    }
  };

  // ブックマーク追加
  const handleBookmark = async (post) => {
    try {
      await addDoc(collection(db, "bookmarks"), {
        ...post,
        userId: auth.currentUser?.uid,
        createdAt: new Date(),
      });
      alert("ブックマークしました！");
    } catch (error) {
      console.error("ブックマークエラー:", error.message);
    }
  };

  // ブックマーク削除
  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      const bookmarkDocRef = doc(db, "bookmarks", bookmarkId);
      await deleteDoc(bookmarkDocRef);
      alert("ブックマークを削除しました！");
    } catch (error) {
      console.error("削除エラー:", error.message);
    }
  };

  // 投稿削除
  const handleDeletePost = async (postId) => {
    try {
      const postDocRef = doc(db, "music", postId);
      await deleteDoc(postDocRef);
      alert("投稿が削除されました！");
    } catch (error) {
      console.error("投稿削除エラー:", error.message);
    }
  };

  return (
    <div
      className="p-4 space-y-4 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: 'url("/images/white_00115.jpg")' }}
    >
      <h2 className="text-2xl font-bold text-black">Lets share the music!</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border p-2 rounded w-full"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="おすすめポイント"
          className="border p-2 rounded w-full"
        />
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-black">Please select the artist：</h3>
          <PopularArtists onSelect={(artist) => setSelectedArtist(artist)} />
          {selectedArtist && (
            <p className="mt-2 text-black">Selected artist: {selectedArtist.name}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          post
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-2xl font-bold text-black">Posts list</h3>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-md bg-gray-100">
              <h4 className="font-semibold">{post.title}</h4>
              <p>{post.comment}</p>
              <p className="text-sm text-gray-500">{post.artist?.name || "アーティスト未選択"}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {post.url}
              </a>

              <button
                onClick={() => handleBookmark(post)}
                className=" bg-yellow-500 text-white  px-4 py-2 ml-230  rounded"
              >
                Bookmark
              </button>
              {/* 投稿削除ボタン */}
              <button
                onClick={() => handleDeletePost(post.id)}
                className=" bg-red-500 text-white   px-4 py-2 ml-2  rounded "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 追加：ホームページに戻るボタン */}
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white  ml-120 justify-center items-center px-4 py-2 rounded mt-4"
      >
        HOME
      </button>
    </div>
  );
}
