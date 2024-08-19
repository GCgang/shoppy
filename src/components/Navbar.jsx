import { Link } from 'react-router-dom';
import { BsShop, BsCart3, BsFillPencilFill } from 'react-icons/bs';
import { googleLogin, googleLogout, onUserStateChange } from '../api/firebase';
import { useEffect, useState } from 'react';
import User from './User';

export default function NavBar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to={'/'} className='flex items-center text-4xl gap-2 text-brand'>
        <BsShop />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'} className=' text-2xl'>
          <BsCart3 />
        </Link>
        <Link to={'/products/new'} className=' text-2xl'>
          <BsFillPencilFill />
        </Link>
        {user && <User user={user} />}
        {!user && (
          <button
            onClick={googleLogin}
            className='bg-brand text-white p-1 rounded-sm '
          >
            Login
          </button>
        )}
        {user && (
          <button
            onClick={googleLogout}
            className='bg-brand text-white p-1 rounded-sm '
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
