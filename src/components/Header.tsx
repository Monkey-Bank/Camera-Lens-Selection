import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex">
      <div className="flex">
        <h1>Camera Lens Selection</h1>
        <nav>
          <Link to="/">
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
              Home
            </button>
          </Link>
          {user ? (
            <Link to="/mypage">
              <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
                Mypage
              </button>
            </Link>
          ) : (
            <SignInClick />
          )}
        </nav>
      </div>
      <div className="flex">
        {user ? (
          <>
            <AfterUserInfo />
            <SignOutButton />
          </>
        ) : (
          <>
            <BeforeUserInfo />
            <SignInButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

//グーグルボタンでサインイン
function SignInButton() {
  const signInWithGoogle = () => {
    //firebaseを使ってグーグルでサインインする
    signInWithPopup(auth, provider);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
    >
      Googleでログイン
    </button>
  );
}

//Mypageでサインイン
function SignInClick() {
  const signInWithGoogle = () => {
    //firebaseを使ってグーグルでサインインする
    signInWithPopup(auth, provider);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
    >
      Mypage
    </button>
  );
}

//サインアウト
function SignOutButton() {
  return (
    <button
      onClick={() => auth.signOut()}
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
    >
      ログアウト
    </button>
  );
}

function BeforeUserInfo() {
  return (
    <div>
      <p>ようこそ、ゲストさん</p>
    </div>
  );
}

function AfterUserInfo() {
  return (
    <div className="userInfo">
      <p>ようこそ、{auth.currentUser.displayName}さん</p>
    </div>
  );
}
