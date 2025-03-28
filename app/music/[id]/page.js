"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import BookmarkButton from "@/components/BookmarkButton";

export default function MusicDetailPage({ params }) {
  const [music, setMusic] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      const docRef = doc(db, "music", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMusic(docSnap.data());
      } else {
        console.log("音楽が見つかりませんでした");
      }
    };

    fetchMusic();
  }, [params.id]);

  if (!music) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{music.title}</h2>
      <p className="mt-2">URL: <a href={music.url} target="_blank">{music.url}</a></p>
      <p className="mt-2">{music.comment}</p>
      <BookmarkButton musicId={params.id} />
    </div>
  );
}
