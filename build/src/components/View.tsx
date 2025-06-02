import React, { useRef, useEffect, useState } from 'react';
import park from '../images/park.jpg';
import bird from '../images/bird.png';
import SetFavorite from './SetFavorite';

const apertureValues = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

const calculateBlur = (focalLength: number, aperture: number): number => {
  const apertureBlurMap: { [key: number]: number } = {
    1.4: 5,
    2: 4.5,
    2.8: 4,
    4: 3.5,
    5.6: 3,
    8: 2.5,
    11: 2,
    16: 1.5,
    22: 1,
    32: 0.5,
  };
  return (apertureBlurMap[aperture] || 0.5) + focalLength / 500;
};

const View: React.FC = () => {
  const [focalLength, setFocalLength] = useState<number>(16);
  const [aperture, setAperture] = useState<number>(32);

  const backgroundRef = useRef<HTMLImageElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateStyle = () => {
      const blur = calculateBlur(focalLength, aperture);
      const zoomScale = 1 + focalLength / 200;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(-50%, -50%) scale(${zoomScale})`;
        backgroundRef.current.style.filter = `blur(${blur}px)`;
      }

      if (birdRef.current) {
        const birdScale = 1 + focalLength / 50;
        birdRef.current.style.transform = `translate(-50%, -50%) scale(${birdScale})`;
      }
    };

    animationFrameId = requestAnimationFrame(updateStyle);
    return () => cancelAnimationFrame(animationFrameId);
  }, [focalLength, aperture]);

  return (
    <div className="flex flex-col items-center gap-6 px-2 py-4 md:p-6 min-h-screen text-[#626F47]">
      {/* 額縁風ボックス（レスポンシブ対応） */}
      <div className="relative w-full h-[300px] md:w-[1400px] md:h-[700px] bg-[#2b1a0f] p-[12px] md:p-[24px] border-[10px] md:border-[20px] border-[#4b2e1d] rounded-[6px] shadow-[inset_0_0_0_2px_#5c3b27,inset_0_0_0_4px_#3d2416,inset_0_0_10px_rgba(0,0,0,0.5),2px_2px_6px_rgba(0,0,0,0.6)] md:shadow-[inset_0_0_0_4px_#5c3b27,inset_0_0_0_8px_#3d2416,inset_0_0_20px_rgba(0,0,0,0.5),4px_4px_12px_rgba(0,0,0,0.6)]">
        <div className="relative w-full h-full bg-[#3a2a1f] rounded-[4px] border-[4px] md:border-[8px] border-[#5e3e2e] shadow-inner overflow-hidden">
          {/* 背景画像 */}
          <img
            ref={backgroundRef}
            src={park}
            alt="背景画像"
            className="absolute top-1/2 left-1/2 w-full h-full object-cover transition-all"
            style={{
              transform: 'translate(-50%, -50%) scale(1)',
              filter: 'blur(0px)',
            }}
          />
          {/* メイン画像 */}
          <img
            ref={birdRef}
            src={bird}
            alt="メイン画像"
            className="absolute top-1/2 left-1/2 object-contain w-[20%] md:w-[10%] transition-transform"
            style={{
              transform: 'translate(-50%, -50%) scale(1)',
            }}
          />
        </div>
      </div>

      {/* スライダー類 */}
      <div className="w-full max-w-4xl flex flex-col gap-4 px-2 md:px-4">
        <label className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span className="font-semibold text-[#626F47]">
            焦点距離: {focalLength}mm
          </span>
          <input
            type="range"
            min="16"
            max="200"
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="camera-slider"
          />
        </label>

        <label className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span className="font-semibold text-[#626F47]">F値: {aperture}</span>
          <input
            type="range"
            min={0}
            max={apertureValues.length - 1}
            value={apertureValues.indexOf(aperture)}
            onChange={(e) =>
              setAperture(apertureValues[Number(e.target.value)])
            }
            className="camera-slider w-full md:w-2/3"
          />
        </label>
      </div>

      {/* お気に入り登録ボタン */}
      <SetFavorite focalLength={focalLength} aperture={aperture} />
    </div>
  );
};

export default View;
