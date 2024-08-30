export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className='flex items-center'>
      {photoURL && (
        <img
          className='w-10 h-10 rounded-full mr-2'
          src={photoURL}
          alt={displayName}
          referrerPolicy='no-referrer'
        />
      )}
      {displayName && (
        <span className='hidden md:block  whitespace-nowrap  text-ellipsis max-w-xs'>
          {displayName}
        </span>
      )}
    </div>
  );
}
