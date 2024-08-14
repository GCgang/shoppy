import { Link } from 'react-router-dom';
import { BsShop, BsCart3, BsFillPencilFill } from 'react-icons/bs';

export default function NavBar() {
  return (
    <header>
      <Link to={'/'}>
        <BsShop />
        <h1>Shoppy</h1>
      </Link>
      <nav>
        <Link to={'/products'}>Products</Link>
        <Link to={'/carts'}>
          <BsCart3 />

          <h2>Carts</h2>
        </Link>
        <Link to={'/products/new'}>
          <BsFillPencilFill />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
