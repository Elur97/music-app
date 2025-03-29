/*全体のレイアウト*/
import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body className="  min-h-screen font-sans flex flex-col items-center">
        <header className="bg-gray-800 w-full p-10 text-white text-center">
          <h1 className="font-serif text-6xl font-bold">Sharing Memories </h1>
        </header>
        <main className=" w-400">{children}</main>
      </body>
    </html>
  );
}