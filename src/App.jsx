import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';
import { AuthContextProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
