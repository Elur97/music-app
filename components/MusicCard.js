import Link from "next/link";

export default function MusicCard({ music }) {
  return (
    <div className="border p-4 rounded-md flex items-center space-x-4 min-h-[145px] overflow-hidden bg-white">
      {/* 追加したアーティスト画像 */}
      <h3 className="font-bold">{music.title}</h3>
      <p>{music.comment}</p>
      <p>{music.url}</p>
    </div>
  );
}
