"use client";
import { useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function BookmarkButton({ music }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    if (!auth.currentUser) return alert("ログインしてください");

    try {
      await addDoc(collection(db, "bookmarks"), {
        musicId: music.id,
        userId: auth.currentUser.uid,
      });
      setIsBookmarked(true);
    } catch (error) {
      console.error("ブックマークエラー:", error.message);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className={`px-4 py-2 rounded ${isBookmarked ? "bg-green-500" : "bg-blue-500"}`}
      >
        {isBookmarked ? "ブックマーク済み" : "ブックマークする"}
      </button>
    );
  }
      