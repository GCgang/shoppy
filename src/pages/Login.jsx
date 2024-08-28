import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit()}>
      <input {...register('Email')} placeholder='Email' />
      <input {...register('Password')} placeholder='Password' />
    </form>
  );
}
