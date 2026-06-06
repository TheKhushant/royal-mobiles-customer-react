import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Product Details</h1>
      <p className="mt-4 text-zinc-500">Product ID: {id || "unknown"}</p>
    </div>
  );
}
