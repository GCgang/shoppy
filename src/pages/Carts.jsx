import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

const SHIPPING = 3000;
const FREE = 50000;

export default function Carts() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce((acc, cur) => acc + parseInt(cur.price) * cur.quantity, 0);
  const deliveryFee = totalPrice >= FREE ? 0 : SHIPPING;
  return (
    <section className='p-8 flex flex-col'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold pb-4 border-b border-gray-300'>
          내 장바구니
        </h2>
        {!hasProducts && <p className='my-10'>장바구니에 상품이 없습니다.</p>}
      </div>
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송비' price={deliveryFee} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + deliveryFee} />
          </div>
          <Button text='주문하기' />
          <p className='mt-4'>
            * 50,000원 이상 구매시 배송비 무료. (기본 배송비: 3,000원)
          </p>
        </>
      )}
    </section>
  );
}
