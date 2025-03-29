//ホームページ
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div 
      className=" grid grid-cols-2 justify-center gap-6   min-h-screen bg-cover bg-center hover:bg-gray-600 " 
      style={{ 
        backgroundImage: 'url("/images/music-and-leisure-PB7QKEF.jpg")',        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <Link href="/music/register" className="  bg-black rounded-3xl ml-80 mt-35 h-25 w-95  text-center  text-white  font-bold text-4xl font-serif px-6 py-7  ">Sign Up </Link>
      <Link href="/music/login" className="bg-black  rounded-3xl border-2  mt-35  h-25 w-95 ml-30 text-center text-white font-bold font-serif text-4xl px-6 py-7 ">Sign In</Link>
      <Link href="/music" className="bg-black  ml-80  rounded-3xl h-25 w-95 text-center text-white font-bold  font-serif text-4xl px-6 py-7 ">Post </Link>
      <Link href="/music/bookmarks" className="bg-black  rounded-3xl  ml-30 mb-20 h-25 w-95 text-center font-bold font-serif text-4xl text-white px-6 py-7 ">Bookmark</Link>
      <footer className="bg-gray-800 text-white text-center p-2  w-400">
      <p>&copy; 2025 Music App. All rights reserved.</p>
    </footer>  
    </div>
    
    
  );
}
