import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SideBarLayout from "./Layouts/sidebarLayout";
import ProductList from "./Pages/products/productList";
import ProductDetails from "./Pages/products/productDetails";
import { Toaster } from "sonner";
import EnquiryList from "./Pages/enquiries/EnquirieList";
import LoginPage from "./Pages/loginPage/LoginPage";
import { ThemeProvider } from "@/contexts/themeContext";
import { AuthProvider } from "./contexts/authContext";
import NotFound from "./Pages/Not Found page/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized Page/Unauthorized";
function App() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route
                path="/products"
                element={
                  <SideBarLayout>
                    <ProductList />
                  </SideBarLayout>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <SideBarLayout>
                    <ProductDetails />
                  </SideBarLayout>
                }
              />
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route
                  path="/enquiries"
                  element={
                    <SideBarLayout>
                      <EnquiryList />
                    </SideBarLayout>
                  }
                />
              </Route>

              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
