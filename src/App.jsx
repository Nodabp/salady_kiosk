import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CheckoutPage } from "./pages/Checkout";
import { SuccessPage } from "./pages/Success";
import { FailPage } from "./pages/Fail";

const router = createBrowserRouter([
  { path: "/", element: <CheckoutPage /> },
  { path: "/success", element: <SuccessPage /> },
  { path: "/fail", element: <FailPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;