import Sidebar from "@/components/seller/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex gap-5 w-full flex-col  lg:flex-row my-5  items-center sm:items-start">
      <Sidebar />
      <div className=" flex flex-1">{children}</div>
    </div>
  );
}
