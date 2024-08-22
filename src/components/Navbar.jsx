import { Link } from 'react-router-dom';
import { BsShop, BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';
import CartStatus from './CartStatus';

export default function NavBar() {
  const { user, googleLogin, googleLogout } = useAuthContext();

  return (
    <header className='flex justify-between p-2 border-b border-gray-300'>
      <Link to={'/'} className='flex items-center text-4xl gap-2 text-brand'>
        <BsShop />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to={'/products'}>Products</Link>
        {user && (
          <Link to={'/carts'}>
            <CartStatus />
            
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to={'/products/new'} className=' text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={googleLogin} />}
        {user && <Button text={'Logout'} onClick={googleLogout} />}
      </nav>
    </header>
  );
}
