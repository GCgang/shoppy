import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';

export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();

  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: async () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: async () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
