export default function Button({ text, onClick }) {
  return (
    <button className='bg-brand text-white p-1 rounded-sm' onClick={onClick}>
      {text}
    </button>
  );
}
