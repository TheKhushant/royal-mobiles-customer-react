// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, ConfirmDialog } from "@/components/admin/Modal";
import { useRequireAuth } from "@/components/admin/useRequireAuth";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, Loader2, ImageOff } from "lucide-react";

interface Banner {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  image?: string | { url: string } | null;
  link?: string;
  position?: "main" | "secondary" | "flash" | "sidebar";
  order?: number;
  isActive?: boolean;
}

const emptyBanner: Banner = { 
  title: "", 
  subtitle: "", 
  image: "", 
  link: "", 
  position: "main", 
  order: 0, 
  isActive: true 
};

export default function BannersPage() {
  const { ready } = useRequireAuth();
//   const navigate = useNavigate();

  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Banner>(emptyBanner);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get("/banners");
      const data = Array.isArray(res.data) ? res.data : res.data?.banners || [];
      setItems(data);
    } catch {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ready) loadBanners();
  }, [ready]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing.title?.trim()) return toast.error("Title is required");

    setSaving(true);
    try {
      const id = editing._id || editing.id;
      const payload = { ...editing };

      if (typeof payload.image === "object" && payload.image?.url) {
        payload.image = payload.image.url;
      }

      if (id) {
        await api.put(`/banners/${id}`, payload);
        toast.success("Banner updated");
      } else {
        await api.post("/banners", payload);
        toast.success("Banner created");
      }

      setModalOpen(false);
      loadBanners();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/banners/${id}`);
      toast.success("Banner deleted");
      loadBanners();
    } catch {
      toast.error("Delete failed");
    }
  };

  const getImageUrl = (img?: string | { url: string } | null): string => {
    if (!img) return "";
    return typeof img === "string" ? img : img.url || "";
  };

  if (!ready) return null;

  return (
    <AdminLayout>
      <div className="bg-white border border-[#E5E0D8] rounded-2xl p-4 mb-5 shadow-sm flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">Banners</h1>
            <p className="text-sm text-muted-foreground">
            {items.length} banners
            </p>
        </div>

        <button
            onClick={() => {
            setEditing(emptyBanner);
            setModalOpen(true);
            }}
            className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-[#D4AF37]
            text-white
            text-sm font-medium
            hover:brightness-110
            transition-all
            shadow-sm
            "
        >
            <Plus className="w-4 h-4" />
            Add Banner
        </button>
        </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.length === 0 && (
            <p className="col-span-full text-center py-12 text-muted-foreground">No banners yet</p>
          )}

          {items.map((b) => {
            const id = (b._id || b.id)!;
            const imageUrl = getImageUrl(b.image);

            return (
              <div
                key={id}
                className="
                bg-white
                border border-[#E5E0D8]
                rounded-2xl
                overflow-hidden
                shadow-sm
                "
                >
                <div className="aspect-[3/1] bg-[#F8F5F0] relative">
                    {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-8 h-8 text-muted-foreground" />
                    </div>
                    )}

                    <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${
                        b.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                    >
                    {b.isActive ? "Active" : "Inactive"}
                    </span>

                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs bg-black/60 text-white uppercase">
                    {b.position}
                    </span>
                </div>

                <div className="p-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                        {b.title}
                    </h3>

                    {b.subtitle && (
                        <p className="text-sm text-muted-foreground truncate">
                        {b.subtitle}
                        </p>
                    )}

                    {/* {b.link && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                        {b.link}
                        </p>
                    )} */}
                    </div>

                    <div className="flex gap-1">
                    <button
                        onClick={() => {
                        setEditing(b);
                        setModalOpen(true);
                        }}
                        className="
                        p-2
                        rounded-xl
                        bg-[#D4AF37]/10
                        text-[#D4AF37]
                        hover:bg-[#D4AF37]/20
                    "
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => setConfirmId(id)}
                        className="
                        p-2
                        rounded-xl
                        bg-red-500/10
                        text-red-600
                        hover:bg-red-500/20
                    "
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    </div>
                </div>
                </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing._id || editing.id ? "Edit Banner" : "Add Banner"} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Title *</label>
            <input className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Subtitle</label>
            <input className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Image URL</label>
            <input className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={typeof editing.image === "string" ? editing.image : editing.image?.url || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Link</label>
            <input className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={editing.link || ""} onChange={(e) => setEditing({ ...editing, link: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Position</label>
              <select className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={editing.position} onChange={(e) => setEditing({ ...editing, position: e.target.value as any })}>
                <option value="main">Main</option>
                <option value="secondary">Secondary</option>
                <option value="flash">Flash</option>
                <option value="sidebar">Sidebar</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Order</label>
              <input type="number" className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-xl" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: +e.target.value })} />
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
            Active Banner
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2 border border-[#E5E0D8] rounded-xl">Cancel</button>
            <button type="submit" disabled={saving} className="px-5 py-2 bg-[#D4AF37] text-white rounded-xl flex items-center gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => confirmId && handleDelete(confirmId)}
        title="Delete Banner?"
        description="This action cannot be undone."
      />
    </AdminLayout>
  );
}