"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import PopularArtists from "@/components/PopularArtists";
import { useRouter } from "next/navigation";
import { serverTimestamp } from "firebase/firestore";

export default function MusicPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [posts, setPosts] = useState([]);
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
    }, (error) => {
      console.error("データ取得エラー:", error);
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
        artist: selectedArtist, // ここに { id, name, imageUrl } のオブジェクトが入る
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setUrl("");
      setComment("");
      setSelectedArtist(null);
      alert("投稿完了！");

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
        createdAt: serverTimestamp(),
      });
      alert("ブックマークしました！");
    } catch (error) {
      console.error("ブックマークエラー:", error.message);
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
      {/* ユーザー入力フォーム */}
      <h2 className="md:text-3xl text-4xl ml-6 font-bold text-black">Lets share the music!</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="border  p-2 ml-2 rounded md:w-350 w-72"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          className="border p-2 ml-2 rounded md:w-350 w-72"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントまたは感想を入力"
          className="border p-2 ml-2 rounded md:w-350 w-72"
        />
        <div className="ml-2">
          <h3 className="text-3xl font-semibold mb-2 text-black">Please select the artist：</h3>
          <PopularArtists onSelect={(artist) => setSelectedArtist(artist)} />
          {selectedArtist && (
            <p className="pt-2 font-bold text-black">Selected artist: {selectedArtist.name}</p>
          )}
        </div>
        {/* 投稿ボタン */}
        <button type="submit" className="md:ml-170 ml-30
        
        bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded">
          POST
        </button>
      </form>

      <div className="mt-5">
        <h3 className="md:text-3xl text-4xl md:ml-10 font-bold text-black">Posts list</h3>
        <div className="md:space-y-3 md:w-300">
          {posts.map((post) => (
            <div key={post.id} className="md:w-360 w-85  md:ml-5 border p-4 rounded-md bg-white">
              <h4>{post.title}</h4>
              <p>{post.comment}</p>
              <p>{post.artist?.name || "アーティスト未選択"}</p>
              {post.artist?.imageUrl && (
                <img
                  src={post.artist.imageUrl}
                  alt={post.artist.name}
                  className="w-16 h-16 rounded-full mt-2"
                />
              )}
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {post.url}
              </a>
              <div className="flex  md:w-300 md:ml-60">
                <button
                  onClick={() => handleBookmark(post)}
                  className="bg-yellow-500 text-white px-4 py-2 md:ml-230  ml-29   rounded"
                >
                  ブックマーク
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2 md:w-25  rounded"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ホームページに戻るボタン */}
      <button
  onClick={() => router.push("/")}
  className="fixed  md:mr-0 mr-28  bottom-4 right-4 bg-blue-500 hover:bg-blue-800 text-white justify-center items-center px-4 py-2 rounded"
>
  ホームに戻る
</button>

    </div>
  );
}