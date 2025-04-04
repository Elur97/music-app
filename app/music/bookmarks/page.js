"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MusicCard from "@/components/MusicCard";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("ユーザーがログインしています", user.uid);
        setUserId(user.uid);
      } else {
        console.log("ユーザーがログアウトしています");
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchBookmarks = async () => {
        try {
          const bookmarksQuery = query(
            collection(db, "bookmarks"),
            where("userId", "==", userId)
          );
          const bookmarkSnapshot = await getDocs(bookmarksQuery);
          const fetchedBookmarks = bookmarkSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));

          console.log("取得したブックマーク:", fetchedBookmarks);
          setBookmarks(fetchedBookmarks);
        } catch (error) {
          console.error("ブックマークの取得に失敗しました:", error);
        }
      };

      fetchBookmarks();
    }
  }, [userId]);

  return (
    <div
      className="md:ml-20 flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/white_00115.jpg")' }}
    >
      <MusicCard bookmarkedPosts={bookmarks} />  {/* MusicCardにデータを渡す */}
    </div>
  );
}
