import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/loader/loader";
import { Mail, Phone, MessageSquare, Package } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Enquiry {
  id: string;
  product_name: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await api.get("/enquiries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEnquiries(response.data.data || []);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEnquiries();
    } else {
      setLoading(false);
    }
  }, [token]);
  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Enquiries</h2>
        <p className="text-muted-foreground">
          View and manage customer enquiries for your products.
        </p>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead className="w-[300px]">Message</TableHead>
                <TableHead className="text-center">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.length > 0 ? (
                enquiries.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        {item.product_name || "Unknown Product"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 text-primary" /> {item.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 text-primary" /> {item.phone}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-start gap-2 ">
                        <MessageSquare className="h-4 w-4 mt-1 text-primary shrink-0" />
                        <p
                          className="text-sm line-clamp-2 flex w-60 text-wrap"
                          title={item.message}
                        >
                          {item.message}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="text-right whitespace-nowrap">
                      <Badge variant="outline">
                        {new Date(item.created_at).toLocaleDateString()}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(item.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No enquiries found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default EnquiryList;
