import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-rose-700">
          Royal Mobiles
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-700">
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
