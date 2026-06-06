type ProductCardProps = {
  product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-4 flex flex-col gap-3">
      <div className="h-48 bg-zinc-100 rounded-3xl overflow-hidden flex items-center justify-center">
        <img
          src={product?.image || product?.images?.[0] || "https://via.placeholder.com/300"}
          alt={product?.name || "Product"}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-zinc-900">{product?.name || "Product Name"}</h3>
        <p className="text-xs text-zinc-500">{product?.category?.name || product?.category || "Category"}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="font-semibold text-rose-600">₹{product?.price ?? "N/A"}</span>
        <span className="text-xs text-zinc-500">{product?.rating ? `${product.rating}★` : "No rating"}</span>
      </div>
    </div>
  );
}
