import { Routes, Route } from 'react-router-dom';
import { Navbar, Layout, Unauthorized, RememberMe } from './components';
import { Register, Login, Dashboard, Missing } from "./pages";
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

          <Route element={<RememberMe />}>
            <Route element={<RequireAuth rolesAllowed={[ROLES.Admin]} />}>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Route>

          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
