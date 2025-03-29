//ホームページ
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div 
      className=" grid grid-cols-2 justify-center gap-2   min-h-screen bg-cover bg-center  " 
      style={{ 
        backgroundImage: 'url("/images/music-and-leisure-PB7QKEF.jpg")',        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <Link href="/music/register" className="bg-black rounded-3xl ml-80 mt-35 h-20 w-60  text-center  text-white  font-bold text-3xl px-6 py-4   ">Sign Up ＞　</Link>
      <Link href="/music/login" className="bg-black  rounded-3xl border-2  mt-35  h-20 w-60 ml-20 text-center text-white font-bold text-3xl px-6 py-4 ">Sign In ＞</Link>
      <Link href="/music" className="bg-black  ml-80  rounded-3xl h-20 w-60 text-center text-white font-bold   text-3xl px-6 py-4 ">Post ＞</Link>
      <Link href="/music/bookmarks" className="bg-black  rounded-3xl  ml-20 mb-50 h-20 w-60 text-center font-bold text-3xl text-white px-6 py-4 ">Bookmark＞</Link>
      <footer className="bg-gray-800 text-white text-center p-4 mt-20 w-350">
      <p>&copy; 2025 Music App. All rights reserved.</p>
    </footer>  
    </div>
    
    
  );
}
