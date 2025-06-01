import React from 'react';

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

interface ProductModalProps {
  product: LensProduct | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    product.name + ' レンズ'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#fdfaf7] p-6 rounded-2xl shadow-xl max-w-md w-full relative border-2 border-[#5e3e2e]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[#5e3e2e] hover:text-[#3a2a1f] text-xl font-bold"
        >
          ×
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />

        <h2 className="text-2xl font-bold mb-2 text-[#3a2a1f]">
          {product.name}
        </h2>
        <p className="text-sm text-[#5c3b27] mb-4">{product.caption}</p>

        <ul className="space-y-1 text-sm text-[#2b1a0f]">
          <li>📏 焦点距離: {product.focalLength}mm</li>
          <li>🌕 F値: {product.aperture}</li>
          <li>💴 価格: ¥{product.price.toLocaleString()}</li>
          <li>🔧 タイプ: {product.type}</li>
          <li>🪝 マウント: {product.mount}</li>
        </ul>

        <div className="mt-6 flex justify-end space-x-3">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#4b2e1d] text-white px-4 py-2 rounded hover:bg-[#3a2a1f]"
          >
            Webで検索
          </a>
          <button
            onClick={onClose}
            className="bg-[#5e3e2e] text-white px-4 py-2 rounded hover:bg-[#3d2416]"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
