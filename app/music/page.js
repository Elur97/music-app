"use client"; // クライアントサイドで動作することを明示
import { useState, useEffect } from "react";
import { db, auth } from "@/firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import PopularArtists from "@/components/PopularArtists";
import { useRouter } from "next/navigation";

export default function MusicPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [posts, setPosts] = useState([]);  // 投稿データの状態管理
  const router = useRouter();

  // Firestoreからリアルタイムで投稿データを取得
  useEffect(() => {
    const q = query(collection(db, "music"), orderBy("createdAt", "desc")); // 新しい順に並べる
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);  // postsに投稿データをセット
    });

    return () => unsubscribe();  // クリーンアップ
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
        createdAt: new Date(),  // 現在時刻を保存
      });
      setTitle("");
      setUrl("");
      setComment("");
      setSelectedArtist(null);
      alert("投稿完了！");

      // 投稿完了後にホームページにリダイレクト
      router.push("/");  // ホームページに遷移
    } catch (error) {
      console.error("投稿エラー:", error.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold"> Lets share the music!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <h3 className="text-2xl font-semibold mb-2">Please select the artist：</h3>
          <PopularArtists onSelect={(artist) => setSelectedArtist(artist)} />
          {selectedArtist && (
            <p className="mt-2">Selected artist: {selectedArtist.name}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          post
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold">Posts list</h3>
        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-md bg-gray-100">
              <h4 className="font-semibold">{post.title}</h4>
              <p>{post.comment}</p>
              <p className="text-sm text-gray-500">{post.artist?.name || "アーティスト未選択"}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {post.url}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
