import React, { useState, useEffect } from "react";
import { Mail, Loader } from "lucide-react"; // Import loader icon for loading state
import { useToast } from "@/hooks/use-toast";
import { useForgotPasswordMutation } from "@/hooks/UseAuth";

interface ForgetPasswordProps {
  onSubmitSuccess: (email: string) => void; // Type for the onSubmitSuccess prop
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ onSubmitSuccess }) => {
  const [forgotPassword, { isSuccess, error, isLoading, data: responseData }] = useForgotPasswordMutation();
  const [email, setEmail] = useState<string>("");
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form default behavior
    forgotPassword({ email }); // Send the email to the backend
  };

  // Use useEffect to trigger toast notifications after successful or failed requests
  useEffect(() => {
    if (isSuccess && responseData?.success) {
      toast({
        title: "Success",
        description: responseData.message,
        duration: 2000,
      });
      onSubmitSuccess(email); // Move to ResetPassword dialog, but don't close dialog
    } else if (responseData && responseData.success === false) {
      toast({
        title: "Error",
        description: responseData.message,
        duration: 2000,
      });
    }

    if (error) {
      toast({
        title: "Error",
        description: "An error occurred.",
        duration: 2000,
      });
    }
  }, [isSuccess, responseData, error, toast, onSubmitSuccess, email]);

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col gap-4">
      <div className="w-full flex items-center border border-gray-300 p-2 rounded-md">
        <Mail className="text-gray-500 mr-2" />
        <input
          type="email"
          className="w-full focus:outline-none text-sm sm:text-base"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit" // Ensure button submits the form
        className="w-full bg-primary text-white py-2 rounded-md flex justify-center items-center"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? <Loader className="animate-spin" size={16} /> : "Submit"}
      </button>
    </form>
  );
}

export default ForgetPassword;
