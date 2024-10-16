import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "lucide-react";
import { useLoginMutation } from "@/hooks/UseAuth";
import { useDispatch } from "react-redux";
import { setLogin } from "@/slice/authSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Login = ({ onForgetPassword, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isSuccess, error: loginError, data: responseData, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Logging in",
        description: "Please wait while we log you in.",
        duration: 2000,
      });
    } else if (isSuccess) {
      if (responseData?.success) {
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard",
          duration: 2000,
        });
        dispatch(setLogin({ token: responseData?.data.token }));
        router.push('/');
      } else {
        toast({
          title: "Login Failed",
          description: responseData?.message || "Failed to login",
          duration: 2000,
        });
      }
    } else if (loginError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login",
        duration: 2000,
      });
    }
  }, [isSuccess, isLoading, loginError, responseData, toast, dispatch, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            className="w-full focus:outline-none text-sm sm:text-base"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center border border-gray-300 p-2 rounded-md">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            className="w-full focus:outline-none text-sm sm:text-base"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-blue-500 hover:underline"
            onClick={onForgetPassword}
          >
            Forget Password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-sm sm:text-base"
        >
          Login
        </button>
      </form>

      <div className="my-4 text-center">
        <p>Or</p>
      </div>
      <div className="space-y-2">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm sm:text-base">
          Login with Google
        </button>
        <button className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 text-sm sm:text-base">
          Login with Mobile number
        </button>
      </div>

      <div className="mt-4 text-center">
        <p>
          Don’t have an account?{" "}
          <button onClick={onSignup} className="text-blue-500 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

export default Login;
