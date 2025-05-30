import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProductModal from './ProductModal';

interface Favorite {
  id: string;
  focalLength: number;
  aperture: number;
  createdAt: any;
  price?: number;
  purpose?: string;
}

interface LensProduct {
  name: string;
  focalLength: number;
  aperture: number;
  price: number;
  type: '単焦点' | 'ズーム';
  mount: string;
  imageUrl: string;
  caption: string;
}

const dummyLenses: LensProduct[] = [
  {
    name: 'Sony 50mm F1.8',
    focalLength: 50,
    aperture: 1.8,
    price: 30000,
    type: '単焦点',
    mount: 'Sony E',
    imageUrl: 'https://example.com/sony50.jpg',
    caption: '軽量で明るい標準単焦点レンズ。',
  },
  {
    name: 'Canon RF 24-70mm F2.8',
    focalLength: 24,
    aperture: 2.8,
    price: 150000,
    type: 'ズーム',
    mount: 'Canon RF',
    imageUrl: 'https://example.com/canon2470.jpg',
    caption: 'プロ向け高画質ズームレンズ。',
  },
  {
    name: 'Nikon 35mm F1.4',
    focalLength: 35,
    aperture: 1.4,
    price: 90000,
    type: '単焦点',
    mount: 'Nikon Z',
    imageUrl: 'https://example.com/nikon35.jpg',
    caption: '明るく高解像の単焦点レンズ。',
  },
  {
    name: 'Tamron 28-75mm F2.8',
    focalLength: 28,
    aperture: 2.8,
    price: 85000,
    type: 'ズーム',
    mount: 'Sony E',
    imageUrl: 'https://example.com/tamron2875.jpg',
    caption: 'コスパに優れた標準ズーム。',
  },
];

const Mypage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [user] = useAuthState(auth);
  const [searchFocalLength, setSearchFocalLength] = useState<number>(50);
  const [searchAperture, setSearchAperture] = useState<number>(2.8);
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
    return (
      lens.focalLength >= searchFocalLength &&
      lens.aperture <= searchAperture &&
      (lensType === '' || lens.type === lensType) &&
      (mount === '' || lens.mount.toLowerCase().includes(mount.toLowerCase()))
    );
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
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
                className="border p-3 rounded shadow flex justify-between items-center"
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
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">
              焦点距離 (mm)
            </label>
            <input
              type="number"
              value={searchFocalLength}
              onChange={(e) => setSearchFocalLength(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">F値</label>
            <input
              type="number"
              value={searchAperture}
              onChange={(e) => setSearchAperture(Number(e.target.value))}
              className="w-full border rounded p-2"
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
              className="w-full border rounded p-2"
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
              className="w-full border rounded p-2"
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
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLenses.map((lens, index) => (
              <li key={index} className="border p-3 rounded shadow">
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
                  className="mt-2 text-blue-500 underline"
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
