import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/product-slice";
import supabase from "../utilities/supabase";
import axios from "axios";
import { fetchUserProfile } from "../features/user/user-profile-slice";
import { fetchCart } from "../features/cart/cart-slice";

const ProductPage = ({ url }) => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const getLoggedInUser = async () => {
      const { data: supabaseData } = await supabase.auth.getSession();
      const { session } = supabaseData;

      const userEmail = session.user.email;
      const { data } = await axios.post(`${url}/login`, { email: userEmail });
    };

    getLoggedInUser();
    dispatch(fetchProducts());
  }, []);

  const addToCart = async (ProductId) => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      await axios.patch(
        `${url}/cart/add/${ProductId}`,
        {},
        {
          headers: {
            Authorization: `Basic ${authorization}`,
          },
        }
      );

      dispatch(fetchCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((el, index) => {
          return (
            <ProductCard key={index} product={el} onButtonClick={addToCart} />
          );
        })}
      </section>
    </div>
  );
};

export default ProductPage;
