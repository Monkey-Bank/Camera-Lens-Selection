import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="flex flex-col md:flex-row md:justify-between items-start md:items-center px-6 py-4 bg-[#F5ECD5] shadow-md gap-y-4 md:gap-0">
      {/* Left: Logo & Nav */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
        <h1 className="text-xl font-bold tracking-wide text-[#626F47]">
          Camera Lens Selection
        </h1>
        <nav className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
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
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
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
  const userName = auth.currentUser?.displayName ?? 'ユーザー';
  return (
    <div className="userInfo">
      <p>ようこそ、{userName}さん</p>
    </div>
  );
}
