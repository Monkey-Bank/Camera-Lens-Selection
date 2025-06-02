import React from 'react';
import { db } from './Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';
import { toast } from 'react-toastify';

interface SetFavoriteProps {
  focalLength: number;
  aperture: number; // F値
}

const SetFavorite: React.FC<SetFavoriteProps> = ({ focalLength, aperture }) => {
  const [user] = useAuthState(auth);

  const handleFavorite = async () => {
    try {
      if (!user) {
        toast.warn('ログインしてください');
        return;
      }

      await addDoc(collection(db, 'users', user.uid, 'favorites'), {
        focalLength,
        aperture: aperture,
        createdAt: new Date(),
      });

      toast.success('お気に入りに登録しました');
    } catch (error) {
      console.error('登録失敗:', error);
      toast.error('お気に入りの登録に失敗しました');
    }
  };

  return (
    <div>
      <button
        onClick={handleFavorite}
        className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150"
      >
        お気に入りに登録
      </button>
    </div>
  );
};

export default SetFavorite;
