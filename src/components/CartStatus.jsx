import { BsCart3 } from 'react-icons/bs';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery({
    queryKey: 'carts',
    queryFn: () => getCart(uid),
  });

  return (
    <div className='relative'>
      <BsCart3 className='text-4xl' />
      {products && (
        <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>
          {products.length}
        </p>
      )}
    </div>
  );
}
