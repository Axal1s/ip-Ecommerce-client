import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionHistory } from "../features/user/transaction-history-slice";
import { useEffect } from "react";
import { format } from "date-fns";

const TransactionHistoryPage = ({ url }) => {
  const { transactions } = useSelector((state) => state.transactionHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Order ID</th>
            <th>Price</th>
            <th>Status</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {/* Optional Chaining ! */}
          {transactions.length > 0 &&
            transactions?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center justify-center  ">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={el.Product.imageUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{el.Product.title}</td>
                  <td>{el.orderId}</td>
                  <td>Rp. {el.amount}</td>
                  {el.status === "paid" ? (
                    <td className="text-success">{el.status}</td>
                  ) : (
                    <td className="text-warning">{el.status}</td>
                  )}
                  <td>{format(el.createdAt, "MMMM do yyyy, h:mm:ss a")}</td>
                </tr>
              );
            })}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default TransactionHistoryPage;
