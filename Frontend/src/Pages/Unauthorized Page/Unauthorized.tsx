import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground gap-6 px-4">
      <div className="bg-destructive/10 p-6 rounded-full">
        <ShieldAlert className="h-12 w-12 text-destructive" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">403</h1>
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          You don&apos;t have permission to access this resource. Please contact
          your administrator if you believe this is an error.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate("/products")}>Return to Safety</Button>
        <span>or</span> 
        <Button onClick={() => navigate("/login")}>Login as Admin</Button>
      </div>
    </div>
  );
}
