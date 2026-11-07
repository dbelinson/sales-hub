import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CustomersProvider } from "@/context/CustomersContext";
import LoginPage from "@/pages/LoginPage";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import CustomerDetailPage from "@/pages/CustomerDetailPage";
import PlaceholderPage from "@/pages/PlaceholderPage";

function App() {
  return (
    <CustomersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/kunden/:id" element={<CustomerDetailPage />} />
            <Route path="/pipeline" element={<PlaceholderPage title="Pipeline" />} />
            <Route path="/berichte" element={<PlaceholderPage title="Berichte" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CustomersProvider>
  );
}

export default App;
