"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";  // useParamsをインポート
import BookmarkButton from "@/components/BookmarkButton";

export default function MusicDetailPage() {
  const { id } = useParams();  // useParams()でparams.idを取得
  const [music, setMusic] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const docRef = doc(db, "music", id);  // idを使ってFirestoreからデータを取得
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMusic(docSnap.data());
      } else {
        console.log("音楽が見つかりませんでした");
      }
    };

    if (id) {
      fetchMusic();
    }
  }, [id]);

  if (!music) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{music.title}</h2>
      <p className="mt-2">URL: <a href={music.url} target="_blank" rel="noopener noreferrer">{music.url}</a></p>
      <p className="mt-2">{music.comment}</p>
      <BookmarkButton musicId={id} />
    </div>
  );
}
