import { Routes, Route } from 'react-router-dom';
import { Navbar, Layout } from './components';
import { Register } from "./pages";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
