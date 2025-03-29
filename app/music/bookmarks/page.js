"use client";
import { auth } from "@/firebase/firebase";
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import MusicCard from "@/components/MusicCard";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // ユーザーの認証状態の変更を監視
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("ユーザーがログインしています", user.uid);
        setUserId(user.uid);  // ユーザーがログインしたらユーザーIDを保存
      } else {
        console.log("ユーザーがログアウトしています");
        setUserId(null);  // ログアウトしたらユーザーIDをnullに
      }
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);  // 初回のみ実行

  useEffect(() => {
    // ユーザーIDがセットされたときにブックマークを取得
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
          setBookmarks(fetchedBookmarks);  // 取得したブックマークをステートにセット
        } catch (error) {
          console.error("ブックマークの取得に失敗しました:", error);
        }
      };

      fetchBookmarks();
    }
  }, [userId]);  // userIdが変わるたびに実行

  return (
    <div
      className=" flex flex-col  items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/white_00115.jpg")' }} // 背景画像を設定
    >
      {bookmarks.length > 0 ? (
        bookmarks.map((bookmark) => (
          <MusicCard key={bookmark.id} music={bookmark} />
        ))
      ) : (
        <p className="text-4xl font-bold items-center justify-center mb-35 text-black">
          ブックマークされた投稿が表示されるまでしばらくお待ちください……
        </p>
      )}
    </div>
  );
}
