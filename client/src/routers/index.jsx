import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import BaseLayout from "../layouts/BaseLayout";
import ProductPage from "../views/ProductPage";
import CartPage from "../views/CartPage";
import TransactionHistoryPage from "../views/TransactionHistoryPage";

const url = "https://ip-server.axalis-project.online";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <ProductPage url={url} />,
      },
      {
        path: "/cart",

        element: <CartPage url={url} />,
      },
      {
        path: "/transaction-history",
        // loader: () => {
        //   for (let i = 0; i < localStorage.length; i++) {
        //     if (!localStorage.key(i).endsWith("auth-token")) {
        //       return null;
        //     }
        //   }

        //   return redirect("/login");
        // },
        element: <TransactionHistoryPage url={url} />,
      },
    ],
  },
]);

export default router;
