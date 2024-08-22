import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getCart } from '../api/firebase';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
const SHIPPING = 3000;

export default function Carts() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: 'products',
    queryFn: () => getCart(uid),
  });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, cur) => prev + parseInt(cur.price) * cur.quantity,
      0
    );
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
}
