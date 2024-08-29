import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsShop, BsFillPencilFill } from 'react-icons/bs';
import { IoMenu, IoClose } from 'react-icons/io5';

import User from './User';
import { useAuthContext } from '../context/AuthContext';
import Button from './ui/Button';
import CartStatus from './CartStatus';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const { user, googleLogout } = useAuthContext();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const categories = [
    { name: '전체상품', path: 'all' },
    { name: '청소', path: 'cleaning' },
    { name: '세탁', path: 'laundry' },
    { name: '수납/정리', path: 'organization' },
  ];

  const handleToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  useEffect(() => {
    closeToggle();
  }, [location]);

  return (
    <header className='flex justify-between items-center p-2 border-b border-gray-300  relative'>
      {toggle ? (
        <IoClose className='text-2xl' onClick={handleToggle} />
      ) : (
        <IoMenu className='text-2xl' onClick={handleToggle} />
      )}
      <Link to={'/'} className='flex items-center text-4xl gap-2 text-brand'>
        <BsShop />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
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
        <div>{user && <User user={user} />}</div>
        <div>
          {!user && (
            <Button text={'Login'} onClick={() => navigate('/login')} />
          )}
          {user && <Button text={'Logout'} onClick={googleLogout} />}
        </div>
      </nav>
      {toggle && (
        <div className='absolute top-full left-0 w-full bg-white z-10 p-4 '>
          <ul className='flex flex-col items-center gap-3 font-semibold cursor-pointer'>
            {categories.map((category) => (
              <li key={category.path} className='w-full'>
                <Link
                  to={`/products/${category.path}`}
                  className='text-xl w-full text-center hover:bg-brand hover:text-white p-2 block'
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
