import Products from '../components/Products';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <>
      <Banner />
      <Products filter='all' />
    </>
  );
}
