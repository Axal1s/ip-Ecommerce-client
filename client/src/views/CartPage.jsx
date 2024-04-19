import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cart-slice";
import axios from "axios";
import supabase from "../utilities/supabase";
import { useNavigate } from "react-router-dom";

const CartPage = ({ url }) => {
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeProduct = async (id) => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      await axios.patch(
        `${url}/cart/remove/${id}`,
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

  const handlePayment = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const email = session.session.user.email;

      const authorization = btoa(`${email}:`);

      const { data } = await axios.get(`${url}/transaction/midtrans/initiate`, {
        headers: {
          Authorization: `Basic ${authorization}`,
        },
      });

      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      window.snap.pay(`${data.transactionToken}`, {
        onSuccess: async function (result) {
          /* You may add your own implementation here */
          await axios.patch(
            `${url}/transaction/success`,
            {
              orderId: result.order_id,
            },
            {
              headers: {
                Authorization: `Basic ${authorization}`,
              },
            }
          );

          await axios.patch(
            `${url}/cart/clear`,
            {},
            {
              headers: {
                Authorization: `Basic ${authorization}`,
              },
            }
          );

          navigate("/transaction-history");
        },
        // onPending: function (result) {
        //   /* You may add your own implementation here */
        //   alert("wating your payment!");
        //   console.log(result);
        // },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {/* Optional Chaining ! */}
          {cart.length > 0 &&
            cart?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center justify-center  ">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={el.imageUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{el.title}</td>
                  <td>Rp. {el.price}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        removeProduct(el.id);
                      }}
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
          <tr>
            <td>
              <div className="flex items-center justify-center  ">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12"></div>
                </div>
              </div>
            </td>
            <td></td>
            <td>
              <p className="font-bold">Subtotal:</p>
              <p>Rp. {totalPrice}</p>
            </td>
            <th>
              <button
                className="btn w-full md:w-1/2 btn-primary "
                onClick={handlePayment}
              >
                Buy
              </button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default CartPage;
