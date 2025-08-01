import {createBrowserRouter} from "react-router-dom";
import {Test} from "./components/Test.jsx";
import {CheckoutPage} from "./pages/toss/Checkout.jsx";
import {SuccessPage} from "./pages/toss/Success.jsx";
import {FailPage} from "./pages/toss/Fail.jsx";
import {Test2} from "./components/Test2.jsx";
import Index from "./pages/kiosk/index.jsx";
import {Complete} from "./pages/toss/Complete.jsx";

export const router = createBrowserRouter([
    { path: "/test", element: <Test/> },
    { path: "/toss/Checkout", element: <CheckoutPage /> },
    { path: "/toss/success", element: <SuccessPage /> },
    { path: "/toss/fail", element: <FailPage /> },
    { path: "/test2", element: <Test2 /> },
    { path: "/", element: <Index/> },
    { path: "/toss/complete", element: <Complete/>},
]);