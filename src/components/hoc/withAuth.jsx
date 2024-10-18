import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast'; 

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.authSlice.token);
    const { toast } = useToast();

    useEffect(() => {
      if (!token) {
        toast({
          title: 'Not logged in',
          description: 'Please login first',
          duration: 2000,
        });
        router.push('/signin');
      }
    }, [token, router, toast]);

    if (token) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return Auth;
};

export default withAuth;
