import Sidebar from "@/components/seller/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex gap-5 w-full flex-col justify-center lg:flex-row my-5  items-center sm:items-start">
      <Sidebar />
      <div className="flex-1 flex">{children}</div>
    </div>
  );
}
