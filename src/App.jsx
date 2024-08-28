import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
