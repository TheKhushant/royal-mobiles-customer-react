import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function Payment() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [, setOrder] = useState<any>(null);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = localStorage.getItem("currentOrderId");
      if (!orderId) return;

      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data.order);
        setStatus(res.data.order.status);
      } catch (err) {
        console.error(err);
        toast.error("Order details not found");
      }
    };

    fetchOrder();
  }, []);

  const checkPayment = async () => {
    try {
      setLoading(true);
      const orderId = localStorage.getItem("currentOrderId");
      if (!orderId) {
        toast.error("Order not found");
        return;
      }

      const res = await api.get(`/orders/${orderId}`);
      const updatedOrder = res.data.order;

      setOrder(updatedOrder);
      setStatus(updatedOrder.status);

      if (updatedOrder.status === "Confirmed") {
        toast.success("Payment approved!");
        navigate("/order-confirmed");
        return;
      }

      if (updatedOrder.status === "Cancelled") {
        toast.error("Payment rejected. Please contact support.");
        return;
      }

      toast.info("Payment verification is still pending.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to check payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-10">
      <div className="royal-border bg-white rounded-3xl p-6 sm:p-8">
        
        {/* Main Message */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl mb-4 text-green-700">
            Information Received
          </h1>
          <p className="text-lg text-zinc-700 leading-relaxed">
            Your information has reached us.<br />
            Our team will contact you shortly.
          </p>
          <p className="text-zinc-600 mt-3">
            You can also call us on this number:
          </p>
          <a 
            href="tel:+919172891633" 
            className="inline-block mt-2 text-xl font-semibold text-rose-600 hover:underline"
          >
            +91 91728 91633
          </a>
        </div>

        {/* Check Status Button */}
        <button
          onClick={checkPayment}
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white py-3.5 rounded-2xl font-semibold disabled:opacity-50 mb-8"
        >
          {loading ? "Checking..." : "Check Payment Status"}
        </button>

        <p className="text-center text-xs text-zinc-500 mb-10">
          Current Status: <span className="font-semibold">{status}</span>
        </p>

        
      </div>
    </section>
  );
}