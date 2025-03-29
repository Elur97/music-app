import Link from "next/link";

export default function MusicCard({ music }) {
  return (
    <div className="w-[1200px] border p-2 rounded-md flex flex-col items-start min-h-[150px] overflow-hidden bg-white">
      <h2 className="text-2xl">タイトル: {music.title}</h2>
      <p className="mt-2">URL: <a href={music.url} target="_blank" rel="noopener noreferrer">{music.url}</a></p>
      <p className="mt-2">コメント: {music.comment}</p>
    </div>
  );
}
