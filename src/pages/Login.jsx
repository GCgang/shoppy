import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { user, googleLogin, signUp, signIn } = useAuthContext();
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const onValid = async (data) => {
    try {
      if (login) {
        await signIn(data.email, data.password);
      } else {
        if (data.password !== data.confirmPassword) {
          setError('confirmPassword', {
            message: '입력한 비밀번호와 다릅니다.',
          });
          return;
        }
        await signUp(data.email, data.password);
      }
    } catch (error) {
      setError('email', { message: error.message });
    }
  };

  return (
    <div className='flex justify-center items-center py-32'>
      <div className='w-full max-w-lg px-4 rounded-lg '>
        <h2 className='text-center text-2xl font-bold'>
          {login ? 'LOGIN' : 'Create Account'}
        </h2>
        <form
          onSubmit={handleSubmit(onValid)}
          className='flex flex-col gap-4 mt-6'
        >
          <input
            className='rounded-md w-full p-4 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-brand transition duration-200'
            {...register('email', {
              required: '이메일을 입력 해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '올바른 이메일 형식을 입력해 주세요.',
              },
            })}
            placeholder='Email...'
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
          <input
            className='rounded-md w-full p-4 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-brand transition duration-200'
            {...register('password', {
              required: '비밀번호를 입력 해주세요.',
              minLength: {
                value: 10,
                message: '비밀번호는 10자 이상이어야 합니다.',
              },
            })}
            type='password'
            placeholder='Password...'
          />
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
          {!login && (
            <input
              className='rounded-md w-full p-4 ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-brand transition duration-200'
              {...register('confirmPassword', {
                required: '비밀번호를 입력 해주세요.',
                minLength: {
                  value: 10,
                  message: '비밀번호는 10자 이상이어야 합니다.',
                },
              })}
              type='password'
              placeholder='Confirm Password...'
            />
          )}
          {errors.confirmPassword && (
            <span className='text-red-500'>
              {errors.confirmPassword.message}
            </span>
          )}
          <Button
            text={login ? 'LOGIN' : 'CREATE ACCOUNT'}
            className='w-full bg-brand text-white py-4 rounded'
          ></Button>
        </form>
        <button
          className='w-full py-4'
          onClick={() => setLogin((prev) => !prev)}
        >
          {!login ? ' Log In' : 'Create Account'}
        </button>
        <div className='flex flex-col gap-2 mt-2'>
          <Button
            text='Continue with Google'
            onClick={googleLogin}
            icon={FaGoogle}
            bgColor='bg-black'
            textColor='text-white'
            className='w-full py-3 rounded'
          />
        </div>
      </div>
    </div>
  );
}
