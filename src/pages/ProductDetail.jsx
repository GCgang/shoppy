import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';
import { useAuthContext } from '../context/AuthContext';

export default function ProductDetail() {
  const { addOrUpdateItem } = useCart();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), 4000);
      },
    });
  };
  return (
    <>
      <p className='mx-12 mt-4 text-gray-700'>{category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        <div className='w-full px-4 basis-7/12'>
          <img src={image} alt={title} />
        </div>
        <div className='w-full basis-5/12 flex flex-col p-4 gap-2'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2  border-b border-gray-400'>
            {price.toLocaleString()}원
          </p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center mb-4'>
            <label className='text-brand font-bold' htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            {success && <p className='my-2'>✅ {success}</p>}
            <Button
              text='BUY NOW'
              bgColor='bg-black'
              onClick={() => {
                alert('준비중 입니다.');
              }}
            ></Button>
            {user ? (
              <Button text='장바구니에 추가' onClick={handleClick} />
            ) : (
              <Button text='Log in' onClick={() => navigate('/login')} />
            )}
            {!user && (
              <p className='py-4 text-lg'>
                로그인 후 장바구니에 추가할 수 있습니다.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
