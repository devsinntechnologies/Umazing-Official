
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
// import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';

const requireAuth = (WrappedComponent, redirectPath = '/') => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.authSlice.token);

    useEffect(() => {
      if (token) {
        router.push(redirectPath);
      }
    }, [token, router, redirectPath]);

    if (token) {
        return <div>Loading...</div>;
        // return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default requireAuth;
