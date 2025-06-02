import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProductModal from './ProductModal';
import { dummyLenses, type LensProduct } from './LensData';

interface Favorite {
  id: string;
  focalLength: number;
  aperture: number;
  createdAt: any;
  price?: number;
  purpose?: string;
}

const Mypage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [user] = useAuthState(auth);
  const [searchFocalLength, setSearchFocalLength] = useState<string>('16');
  const [searchAperture, setSearchAperture] = useState<string>('1.4');
  const [lensType, setLensType] = useState<'単焦点' | 'ズーム' | ''>('');
  const [mount, setMount] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<LensProduct | null>(
    null
  );

  useEffect(() => {
    if (!user) return;
    const favoritesRef = collection(db, 'users', user.uid, 'favorites');
    const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
      const favs: Favorite[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Favorite[];
      setFavorites(favs);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
    } catch (error) {
      console.error('削除に失敗しました:', error);
      alert('削除に失敗しました');
    }
  };

  const filteredLenses = dummyLenses.filter((lens) => {
    const focalOk =
      searchFocalLength === '' || lens.focalLength >= Number(searchFocalLength);
    const apertureOk =
      searchAperture === '' || lens.aperture <= Number(searchAperture);
    const typeOk = lensType === '' || lens.type === lensType;
    const mountOk =
      mount === '' || lens.mount.toLowerCase().includes(mount.toLowerCase());

    return focalOk && apertureOk && typeOk && mountOk;
  });

  return (
    <div className="p-4 w-full md:max-w-6xl mx-auto my-5 bg-[#F5ECD5] min-h-screen text-[#626F47]">
      <h2 className="text-2xl font-bold mb-6">📸 マイページ</h2>

      {/* お気に入り一覧 */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">⭐ お気に入り一覧</h3>
        {favorites.length === 0 ? (
          <p>お気に入りは登録されていません。</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="w-full md:w-[48rem] border border-[#A4B465] bg-white p-3 rounded shadow flex justify-between items-center"
              >
                <div>
                  焦点距離: {fav.focalLength}mm / F値: {fav.aperture}
                </div>
                <button
                  onClick={() => handleDelete(fav.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 検索フォーム */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">🔍 レンズ検索</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">
              焦点距離 (mm)
            </label>
            <input
              type="number"
              value={searchFocalLength}
              onChange={(e) => setSearchFocalLength(e.target.value)}
              className="w-full border border-[#A4B465] rounded p-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">F値</label>
            <input
              type="number"
              value={searchAperture}
              onChange={(e) => setSearchAperture(e.target.value)}
              className="w-full border border-[#A4B465] rounded p-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              レンズタイプ
            </label>
            <select
              value={lensType}
              onChange={(e) =>
                setLensType(e.target.value as '単焦点' | 'ズーム' | '')
              }
              className="w-full border border-[#A4B465] rounded p-2 bg-white"
            >
              <option value="">すべて</option>
              <option value="単焦点">単焦点</option>
              <option value="ズーム">ズーム</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              マウント（メーカー）
            </label>
            <input
              type="text"
              value={mount}
              onChange={(e) => setMount(e.target.value)}
              placeholder="例: Sony E, Canon RF"
              className="w-full border border-[#A4B465] rounded p-2 bg-white"
            />
          </div>
        </div>
      </section>

      {/* 検索結果 */}
      <section>
        <h3 className="text-xl font-semibold mb-3">📦 レンズ候補</h3>
        {filteredLenses.length === 0 ? (
          <p>条件に合うレンズが見つかりませんでした。</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredLenses.map((lens, index) => (
              <li
                key={index}
                className="border border-[#A4B465] bg-white p-3 rounded shadow"
              >
                <p className="font-semibold">{lens.name}</p>
                <p>
                  焦点距離: {lens.focalLength}mm / F値: {lens.aperture}
                </p>
                <p>
                  価格: ¥{lens.price.toLocaleString()} / タイプ: {lens.type} /
                  マウント: {lens.mount}
                </p>
                <button
                  onClick={() => setSelectedProduct(lens)}
                  className="mt-2 text-[#F0BB78] hover:underline font-medium"
                >
                  詳細を見る
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Mypage;
