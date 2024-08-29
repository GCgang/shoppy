export default function Button({
  text,
  onClick,
  icon: Icon,
  bgColor = 'bg-brand',
  textColor = 'text-white',
}) {
  return (
    <button
      className={`${bgColor} ${textColor} flex items-center justify-center gap-2 p-2 w-full`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
}
