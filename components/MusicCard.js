import Link from "next/link";

export default function MusicCard({ music }) {
  return (
    <div className="border p-4 rounded-md">
      <h3 className="font-bold">{music.title}</h3>
      <p>{music.comment}</p>
      <Link href={`/music/${music.id}`} className="text-blue-500">詳細を見る</Link>
    </div>
  );
}