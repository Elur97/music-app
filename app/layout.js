import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-sans flex flex-col items-center">

        {/* ヘッダー (横幅いっぱいに広げる) */}
        <header className="bg-gray-800 w-full p-14 px-14 text-white text-center">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold">TuneBord</h1>
        </header>

        {/* メインコンテンツ */}
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
