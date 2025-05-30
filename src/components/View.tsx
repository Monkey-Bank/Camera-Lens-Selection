import React, { useRef, useEffect, useState } from 'react';
import park from '../images/park.png';
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
  return (apertureBlurMap[aperture] || 0.5) + focalLength / 70;
};

const View: React.FC = () => {
  const [focalLength, setFocalLength] = useState<number>(1);
  const [aperture, setAperture] = useState<number>(32);

  const backgroundRef = useRef<HTMLImageElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);

  // アニメーションフレームでスタイル更新
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
    <div>
      <p>画像を額縁か、カメラの液晶にはめ込む</p>
      <p>16-200mmまでズームできるようにする</p>
      <p>背景画像を綺麗な奴にする</p>
      <p>
        レンズのダミーデータを別のコンポーネントで管理する。ミラーレスレンズ。SONY,canon,nikon,TAMRON,Fujifilm,SIGMA
        F値は1.2から。焦点距離は16-200mmまで
      </p>
      <div className="w-[750px] h-[500px] relative overflow-hidden">
        <img
          ref={backgroundRef}
          src={park}
          alt="背景画像"
          className="absolute top-1/2 left-1/2 w-full h-full object-cover"
          style={{
            transform: 'translate(-50%, -50%) scale(1)',
            filter: 'blur(0px)',
            transition: 'transform 0.3s ease, filter 0.3s ease',
          }}
        />
        <img
          ref={birdRef}
          src={bird}
          alt="メイン画像"
          className="absolute top-1/2 left-1/2 object-cover w-[30%]"
          style={{
            transform: 'translate(-50%, -50%) scale(1)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
      <p>
        焦点距離：<span>{focalLength + 23}</span>
      </p>
      <input
        type="range"
        min="1"
        max="57"
        value={focalLength}
        onChange={(e) => setFocalLength(Number(e.target.value))}
        className="camera-slider"
      />
      <p>
        F値：<span>{aperture}</span>
      </p>
      <input
        type="range"
        min={0}
        max={apertureValues.length - 1}
        value={apertureValues.indexOf(aperture)}
        onChange={(e) => setAperture(apertureValues[Number(e.target.value)])}
        className="camera-slider"
      />
      <SetFavorite focalLength={focalLength + 23} aperture={aperture} />
    </div>
  );
};

export default View;
