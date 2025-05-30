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
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
      >
        お気に入りに登録
      </button>
    </div>
  );
};

export default SetFavorite;
