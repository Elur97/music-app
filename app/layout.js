/*全体のレイアウト*/
import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-gray-100  min-h-screen font-sans flex flex-col items-center">
        <header className="bg-green-400 w-full p-6 text-black text-center">
          <h1 className="text-5xl font-bold">Sharing Memories </h1>
        </header>
        <main className=" w-350 ">{children}</main>
      </body>
    </html>
  );
}