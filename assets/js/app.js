'use strict';

//thumbを動かすと焦点距離が変更される
const range1 = document.getElementById('range-1');
const range11 = document.getElementById('range-11');

let rangeValueFirst = Number(range11.value);
range1.textContent = rangeValueFirst + 23;

range11.addEventListener('input', function (e) {
  let rangeValue = Number(e.target.value);
  range1.textContent = rangeValue + 23;
});

//thumbを動かすと、背景が寄ってボケる
const range2 = document.getElementById('range-2');

// range11.addEventListener('input', function () {});

range11.addEventListener('input', function () {
  let value11 = range11.value;
  range2.style.width = 100 + value11 / 1 + '%';
  range2.style.filter = `blur(${0.5 + value11 / 70}px)`;

  const range2Css = window.getComputedStyle(range2, ''); //
  const range2CssBlur = range2Css.getPropertyValue('filter');
  const range2CssBlur_math = parseFloat(range2CssBlur.replace('blur(', '', ')px', '')); //焦点距離を動かしたときのblur値

  let value = range33.value;
  const value_math = parseFloat(value); //焦点距離を動かしたときのF値

  if (value_math === 1.4) {
    range2.style.filter = `blur(${5 + value11 / 70}px)`;
  } else if (value_math === 2) {
    range2.style.filter = `blur(${4.5 + value11 / 70}px)`;
  } else if (value_math === 2.8) {
    range2.style.filter = `blur(${4 + value11 / 70}px)`;
  } else if (value_math === 4) {
    range2.style.filter = `blur(${3.5 + value11 / 70}px)`;
  } else if (value_math === 5.6) {
    range2.style.filter = `blur(${3 + value11 / 70}px)`;
  } else if (value_math === 8) {
    range2.style.filter = `blur(${2.5 + value11 / 70}px)`;
  } else if (value_math === 11) {
    range2.style.filter = `blur(${2 + value11 / 70}px)`;
  } else if (value_math === 16) {
    range2.style.filter = `blur(${1.5 + value11 / 70}px)`;
  } else if (value_math === 22) {
    range2.style.filter = `blur(${1 + value11 / 70}px)`;
  } else if (value_math === 32) {
    range2.style.filter = `blur(${0.5 + value11 / 70}px)`;
  }
});

//thumbを動かすと、女性が寄る
const rangeMain = document.getElementById('range-main');

range11.addEventListener('input', function () {
  let value = range11.value;
  rangeMain.style.width = 30 + value / 1.2 + '%';
});

//thumbを動かすと、F値が変更される
const range3 = document.getElementById('range-3');
const range33 = document.getElementById('range-33');
const myDatalistNum = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

range3.textContent = range33.value;

range33.addEventListener('input', function () {
  for (let i = 0; i < myDatalistNum.length; i++) {
    const elementNum = myDatalistNum[i];
    if (range33.value == elementNum) {
      range3.textContent = range33.value;
    }
  }
});

//thumbを動かすと、F値が変更されて画像がボケる
range33.addEventListener('input', function () {
  // range2.style.filter = `blur(${0 + rangeValue / 0.5}px)`;
  const range2Css = window.getComputedStyle(range2, '');
  const range2CssBlur = range2Css.getPropertyValue('filter');
  const range2CssBlur_math = parseFloat(range2CssBlur.replace('blur(', '', ')px', ''));

  let value = range33.value;
  const value_math = parseFloat(value);

  if (value_math === 1.4) {
    range2.style.filter = `blur(${5 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 2) {
    range2.style.filter = `blur(${4.5 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 2.8) {
    range2.style.filter = `blur(${4 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 4) {
    range2.style.filter = `blur(${3.5 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 5.6) {
    range2.style.filter = `blur(${3 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 8) {
    range2.style.filter = `blur(${2.4 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 11) {
    range2.style.filter = `blur(${2 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 16) {
    range2.style.filter = `blur(${1.5 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 22) {
    range2.style.filter = `blur(${1 + range2CssBlur_math / 70}px)`;
  } else if (value_math === 32) {
    range2.style.filter = `blur(${0.5 + range2CssBlur_math / 70}px)`;
  }
});

//thumbを動かすと、F値が変更されて羽が回転する
const fimg1 = document.getElementById('fimg1');
const fimg2 = document.getElementById('fimg2');
const fimg3 = document.getElementById('fimg3');
const fimg4 = document.getElementById('fimg4');
const fimg5 = document.getElementById('fimg5');
const fimg6 = document.getElementById('fimg6');
const fimg7 = document.getElementById('fimg7');

range33.addEventListener('input', function () {
  let value = range33.value;
  if (value == 1.4) {
    fimg1.style.opacity = 1;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 2) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 1;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 2.8) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 1;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 4) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 1;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 5.6) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 1;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 8) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 1;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 11) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 1;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 0;
  } else if (value == 16) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 1;
    fimg7.style.opacity = 0;
  } else if (value == 22) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 1;
    fimg7.style.opacity = 0;
  } else if (value == 32) {
    fimg1.style.opacity = 0;
    fimg2.style.opacity = 0;
    fimg3.style.opacity = 0;
    fimg4.style.opacity = 0;
    fimg5.style.opacity = 0;
    fimg6.style.opacity = 0;
    fimg7.style.opacity = 1;
  }
});

////thumbを動かすと、画像が寄る
const cameraImg2 = document.getElementById('camera-img2');

range11.addEventListener('input', function () {
  let value = range11.value;
  let rangeValue = Number(value);
  cameraImg2.style.width = rangeValue + 23 + 'px';
});
