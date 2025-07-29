import {createBrowserRouter} from "react-router-dom";
import {Test} from "./pages/Test.jsx";
import {CheckoutPage} from "./pages/Checkout.jsx";
import {SuccessPage} from "./pages/Success.jsx";
import {FailPage} from "./pages/Fail.jsx";
import {Test2} from "./components/Test2.jsx";
import Kiosk from "./pages/Kiosk.jsx";

export const router = createBrowserRouter([
    { path: "/test1", element: <Test/> },
    { path: "/toss/Checkout", element: <CheckoutPage /> },
    { path: "/toss/success", element: <SuccessPage /> },
    { path: "/toss/fail", element: <FailPage /> },
    { path: "/test2", element: <Test2 /> },
    { path: "/", element: <Kiosk/> }
]);