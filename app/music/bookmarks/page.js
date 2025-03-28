"use client";
import { auth } from "@/firebase/firebase";
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import MusicCard from "@/components/MusicCard";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarksQuery = query(
        collection(db, "bookmarks"),
        where("userId", "==", auth.currentUser?.uid)
      );
      const bookmarkSnapshot = await getDocs(bookmarksQuery);
      setBookmarks(bookmarkSnapshot.docs.map(doc => doc.data()));
    };
    if (auth.currentUser) {
      fetchBookmarks();
    }
  }, []);

  return (
    <div className="space-y-4">
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark, index) => <MusicCard key={index} music={bookmark} />)
      ) : (
        <p>お気に入りがありません</p>
      )}
    </div>
  );
}