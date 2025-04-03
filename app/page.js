"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="grid sm:grid-cols-1 md:grid-cols-2 justify-center gap-6 min-h-screen bg-cover sm:bg-cover bg-center hover:bg-gray-600 p-4"
      style={{ backgroundImage: 'url("/images/music-and-leisure-PB7QKEF.jpg")' }}
    >
      {/* Sign Up ボタン */}
      <Link href="/music/register" 
        className="bg-black rounded-3xl text-white font-bold text-2xl sm:text-4xl font-serif text-center 
                  w-full sm:w-60  md:w-95 md:mt-15 h-16 sm:h-20 md:h-25 px-6 py-5 mx-auto mt-7"
      >
        Sign Up
      </Link>

      {/* Sign In ボタン */}
      <Link href="/music/login" 
        className="bg-black rounded-3xl border-2 text-white font-bold font-serif text-2xl sm:text-4xl text-center 
                  w-full sm:w-60 md:mt-15 md:w-95 h-16 sm:h-20 md:h-25 px-6 py-5 mx-auto"
      >
        Sign In
      </Link>

      {/* Post ボタン */}
      <Link href="/music" 
        className="bg-black rounded-3xl text-white font-bold font-serif text-2xl sm:text-4xl text-center 
                  w-full sm:w-60 md:w-95 h-16 sm:h-20 md:h-25 px-6 py-5 mx-auto"
      >
        Post
      </Link>

      {/* Bookmark ボタン */}
      <Link href="/music/bookmarks" 
        className="bg-black rounded-3xl text-white font-bold font-serif text-2xl sm:text-4xl text-center 
                  w-full sm:w-60 md:w-95 h-16 sm:h-20 md:h-25 px-6 py-5 mx-auto"
      >
        Bookmark
      </Link>

      {/* フッター */}
      <footer className="bg-gray-800 text-white text-center p-2 w-88 md:w-370   ">
        <p>&copy; 2025 Music App. All rights reserved.</p>
      </footer>  
    </div>
  );
}
