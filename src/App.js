import { Routes, Route } from 'react-router-dom';
import { Navbar, Layout, Unauthorized } from './components';
import { Register, Login, Dashboard } from "./pages";
import RequireAuth from './helpers/RequireAuth';
import { ROLES } from './helpers/constant';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='unauthorized' element={<Unauthorized />} />

          <Route element={<RequireAuth rolesAllowed={[ROLES.Admin]} />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
