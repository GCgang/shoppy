import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {};
  return (
    <>
      <p>{category}</p>
      <section>
        <img src={image} alt={title} />
        <div>
          <h2>{title}</h2>
          <p> ₩{price}</p>
          <p>{description}</p>
          <div>
            <label htmlFor='select'>옵션:</label>
            <select id='select' onChange={handleSelect} value={selected}>
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
