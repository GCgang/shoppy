export default function User({ user: { photoURL, displayName } }) {
  const defaultImage =
    'https://via.placeholder.com/150/000000/FFFFFF/?text=User';
  return (
    <div className='flex items-center'>
      <img
        className='w-10 h-10 rounded-full mr-2'
        src={photoURL || defaultImage}
        alt={displayName}
        referrerPolicy='no-referrer'
      />
      <span className='hidden md:block  whitespace-nowrap  text-ellipsis max-w-xs'>
        {displayName}
      </span>
    </div>
  );
}
