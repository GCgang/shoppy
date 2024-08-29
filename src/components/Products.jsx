import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products({ filter }) {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  console.log(filter);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid gird-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
        {filter &&
          products &&
          filterProducts(filter, products).map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </ul>
    </>
  );
}

const filterProducts = (filter, products) => {
  if (filter === 'all') {
    return products;
  } else {
    return products.filter((product) => product.category === filter);
  }
};
