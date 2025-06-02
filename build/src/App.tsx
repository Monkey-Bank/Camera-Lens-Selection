import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mypage from './components/Mypage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
