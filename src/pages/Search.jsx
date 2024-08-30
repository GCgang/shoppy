import { useState } from 'react';
import Products from '../components/Products';
import Button from '../components/ui/Button';
import useProducts from '../hooks/useProducts';
import { useForm } from 'react-hook-form';

export default function Search() {
  const {
    productsQuery: { data: products },
  } = useProducts();
  const [searchProducts, setsearchProducts] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (!data.title) {
      setsearchProducts([]);
      return;
    }
    const filteredProducts = products.filter((product) => {
      return product.title.includes(data.title);
    });

    setsearchProducts(filteredProducts);
  };

  return (
    <section className='flex flex-col p-8 gap-4 '>
      <div className='flex flex-col mx-auto w-full max-w-lg px-4 rounded-lg'>
        <h2 className='text-center text-2xl font-bold mb-6'>ITEM SEARCH</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 mb-12'
        >
          <input
            {...register('title')}
            type='text'
            placeholder='상품명'
            className='rounded-md w-full p-4 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-brand transition duration-200'
          />
          <Button
            text='검색'
            className='w-full bg-brand text-white py-4 rounded'
          />
        </form>
      </div>
      <div className='flex flex-col gap-8'>
        <p className='px-4'>
          총 {<span className='text-brand'>{searchProducts.length}</span>}개의
          상품이 검색되었습니다.
        </p>
        {searchProducts.length > 0 ? (
          <Products searchProducts={searchProducts} />
        ) : (
          <p className='text-center'>
            검색결과가 없습니다. <br />
            검색어를 확인해주세요.
          </p>
        )}
      </div>
    </section>
  );
}
