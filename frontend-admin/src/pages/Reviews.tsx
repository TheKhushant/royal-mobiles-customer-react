import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ConfirmDialog } from "@/components/admin/Modal";
import { useRequireAuth } from "@/components/admin/useRequireAuth";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2, Trash2, Eye, EyeOff, Star, Search, Filter } from "lucide-react";

interface Product {
  _id?: string;
  id?: string;
  name: string;
}

interface Review {
  _id?: string;
  id?: string;
  product?: Product | string;
  userName?: string;
  rating?: number;
  comment?: string;
  approved?: boolean;
  isVisible?: boolean;
  createdAt?: string;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest" | "name";

export default function ReviewsPage() {
  const { ready } = useRequireAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "visible" | "hidden">("all");
  const [ratingFilter, setRatingFilter] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews");
      const allReviews: Review[] = Array.isArray(res.data) 
        ? res.data 
        : res.data?.reviews || res.data?.data || [];
      setReviews(allReviews);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      const list = Array.isArray(res.data) ? res.data : res.data?.products || [];
      setProducts(list);
    } catch {}
  };

  useEffect(() => {
    if (ready) {
      loadReviews();
      loadProducts();
    }
  }, [ready]);

  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    // Search
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(r => 
        r.comment?.toLowerCase().includes(term) ||
        r.userName?.toLowerCase().includes(term) ||
        (typeof r.product === 'object' && r.product?.name?.toLowerCase().includes(term))
      );
    }

    // Product Filter
    if (productFilter) {
      result = result.filter(r => {
        const pid = typeof r.product === 'object' ? r.product?._id || r.product?.id : r.product;
        return pid === productFilter;
      });
    }

    // Visibility Filter
    if (visibilityFilter !== "all") {
      result = result.filter(r => {
        const visible = r.isVisible ?? r.approved ?? true;
        return visibilityFilter === "visible" ? visible : !visible;
      });
    }

    // Rating Filter
    if (ratingFilter) {
      result = result.filter(r => (r.rating || 0) >= Number(ratingFilter));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "lowest") return (a.rating || 0) - (b.rating || 0);
      if (sortBy === "name") {
        const nameA = (typeof a.product === 'object' ? a.product?.name : "") || "";
        const nameB = (typeof b.product === 'object' ? b.product?.name : "") || "";
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

    return result;
  }, [reviews, search, productFilter, visibilityFilter, ratingFilter, sortBy]);

  const toggleVisibility = async (r: Review) => {
    const id = r._id || r.id;
    const newVisible = !(r.isVisible ?? r.approved ?? true);

    try {
      await api.put(`/reviews/${id}`, { approved: newVisible, isVisible: newVisible });
      toast.success(newVisible ? "Review is now visible" : "Review hidden");
      loadReviews();
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Review deleted");
      loadReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(new Date(dateStr));
  };

  if (!ready) return null;

  return (
    <AdminLayout>
      <div className="bg-white border border-[#E5E0D8] rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Reviews</h1>
            <p className="text-sm text-muted-foreground">{filteredReviews.length} reviews</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowSearch(!showSearch)} className="w-10 h-10 rounded-xl border border-[#E5E0D8] bg-white hover:bg-[#F8F5F0] flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="w-10 h-10 rounded-xl border border-[#E5E0D8] bg-white hover:bg-[#F8F5F0] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="mt-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user, comment or product..."
              className="w-full px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        )}

        {showFilters && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm">
              <option value="">All Products</option>
              {products.map(p => (
                <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>
              ))}
            </select>

            <select value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value as any)} className="px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm">
              <option value="all">All Status</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>

            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : "")} className="px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm">
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="px-4 py-3 bg-white border border-[#E5E0D8] rounded-xl text-sm">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="name">Product Name</option>
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3 pb-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No reviews found</div>
          ) : (
            filteredReviews.map((r) => {
              const id = (r._id || r.id)!;
              const visible = r.isVisible ?? r.approved ?? true;
              const rating = r.rating || 0;
              const productName = typeof r.product === 'object' ? r.product?.name : "Unknown";

              return (
                <div key={id} className="bg-white border border-[#E5E0D8] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">{r.userName || "Anonymous"}</span>
                        <span className="text-muted-foreground">• {productName}</span>
                        <span className="text-muted-foreground">{formatDate(r.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                        ))}
                        <span className="ml-1 text-sm font-medium">({rating})</span>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{r.comment}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => toggleVisibility(r)}
                        className={`p-2 rounded-xl transition-colors ${visible ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setConfirmId(id)}
                        className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => confirmId && deleteReview(confirmId)}
        title="Delete Review?"
        description="This action cannot be undone."
      />
    </AdminLayout>
  );
}