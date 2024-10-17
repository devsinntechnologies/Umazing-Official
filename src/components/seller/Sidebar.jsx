import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="w-[180px] flex flex-col gap-3"> 
      <Link href="/seller/">Dashboard</Link>
      <Link href="/seller/products">All Products</Link>
      <Link href="/seller/addProduct">Add Product</Link>
      </div>  
  )
}

export default Sidebar
