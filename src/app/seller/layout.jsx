import Sidebar from "@/components/seller/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex gap-4 w-full min-h-screen">  
    <Sidebar />  
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
  </div>
  );
}
