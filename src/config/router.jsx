import {createBrowserRouter} from "react-router-dom";
import {CheckoutPage} from "../pages/toss/Checkout.jsx";
import {SuccessPage} from "../pages/toss/Success.jsx";
import {FailPage} from "../pages/toss/Fail.jsx";
import Index from "../pages/kiosk/index.jsx";
import {Complete} from "../pages/toss/Complete.jsx";

export const router = createBrowserRouter([
    { path: "/toss/Checkout", element: <CheckoutPage /> },
    { path: "/toss/success", element: <SuccessPage /> },
    { path: "/toss/fail", element: <FailPage /> },
    { path: "/", element: <Index/>, errorElement: <FailPage /> },
    { path: "/toss/complete", element: <Complete/> },
]);