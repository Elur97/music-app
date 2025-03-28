"use client";;
import { useState, useEffect } from "react";

// 環境変数から Spotify API の認証情報を取得
const clientId = "19cd03c8029640558542ae4692c26362";
const clientSecret = "bec20dc135194be5ab0b71922b64c90c";
const defaultImage = "/images/white-icon.png";


export default function PopularArtists({ onSelect }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 検索クエリ

  // アクセストークンを取得する関数
  const getAccessToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("アクセストークンの取得に失敗しました", error);
      return null;
    }
  };

  // 人気アーティスト（新着リリースから）を取得する関数
  const fetchPopularArtists = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    try {
      // 新着リリースの取得
      const response = await fetch(
        "https://api.spotify.com/v1/browse/new-releases?country=US&limit=20",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();

      // アルバムからユニークなアーティストIDを収集
      const artistIds = [
        ...new Set(
          data.albums.items.flatMap((album) =>
            album.artists.map((artist) => artist.id)
          )
        ),
      ].slice(0, 10); // 10件に限定

      // 収集したIDでアーティスト詳細情報を取得
      const artistRes = await fetch(
        `https://api.spotify.com/v1/artists?ids=${artistIds.join(",")}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const artistData = await artistRes.json();

      // 画像が無い場合は defaultImage を設定
      const artistList = artistData.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image:
          artist.images && artist.images.length > 0
            ? artist.images[0].url
            : defaultImage,
      }));

      setArtists(artistList);
      setLoading(false);
    } catch (error) {
      console.error("人気アーティストの取得に失敗しました", error);
      setLoading(false);
    }
  };

  // 検索結果を取得する関数
  const searchArtists = async (query) => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();

      const searchedArtists = data.artists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image:
          artist.images && artist.images.length > 0
            ? artist.images[0].url
            : defaultImage,
      }));

      setArtists(searchedArtists);
    } catch (error) {
      console.error("アーティスト検索に失敗しました", error);
    }
  };

  // 検索クエリが変更されたときに検索を実行
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      searchArtists(query);
    } else {
      fetchPopularArtists();
    }
  };

  useEffect(() => {
    fetchPopularArtists();
  }, []);

  if (loading) return <div>アーティストを読み込み中...</div>;

  return (
    <div>
      {/* 検索ボックス */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="アーティストを検索"
        className="p-2 border rounded mb-4"
      />
      <div className="flex flex-wrap gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="cursor-pointer border p-2 rounded flex flex-col items-center"
            onClick={() => onSelect(artist)}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <span className="mt-2 text-sm">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}