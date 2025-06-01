import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="flex items-center justify-around px-6 py-4 bg-[#F5ECD5] shadow-md">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold tracking-wide text-[#626F47]">
          Camera Lens Selection
        </h1>
        <nav className="flex items-center gap-3">
          <Link to="/">
            <button className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150">
              Home
            </button>
          </Link>
          {user ? (
            <Link to="/mypage">
              <button className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150">
                Mypage
              </button>
            </Link>
          ) : (
            <SignInClick />
          )}
        </nav>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-4">
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
    </header>
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
      className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150"
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
      className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150"
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
      className="px-4 py-2 rounded-md bg-[#A4B465] text-[#F5ECD5] font-medium shadow-sm hover:bg-[#F0BB78] hover:text-[#626F47] transition duration-150"
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
