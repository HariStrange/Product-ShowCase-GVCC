import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnquiryDialog } from "@/components/forms/EnquiryDialog";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!product)
    return <div className="p-10 text-center">Product not found.</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between mb-4 ">
        <div>
          <h2 className="text-3xl font-semibold text-secondary-foreground mb-1">
            Product Details
          </h2>
          <p className="text-muted-foreground text-sm">
            Enquire your product here.
          </p>
        </div>
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Button>
      </div>

      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full aspect-square md:aspect-auto h-full max-h-[600px] bg-muted rounded-2xl overflow-hidden shadow-sm border">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div className="flex flex-col justify-start space-y-6">
          <div>
            <Badge className="mb-3 text-sm px-3 py-1">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary">
              ${product.price}
            </p>
          </div>

          <div className="bg-accent/50 p-4 rounded-lg text-accent-foreground border">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="leading-relaxed">{product.short_desc}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-foreground">
              Full Description
            </h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.detailed_desc}
            </p>
          </div>

          <div className="pt-6 mt-auto">
            <EnquiryDialog productId={product.id} productName={product.name} />

            <p className="text-xs text-muted-foreground mt-3 text-center md:text-left">
              * We usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
