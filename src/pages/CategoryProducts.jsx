import { useParams } from 'react-router-dom';
import Products from '../components/Products';

export default function CategoryProducts() {
  const { category } = useParams();

  return (
    <section>
      <Products filter={category} />
    </section>
  );
}
