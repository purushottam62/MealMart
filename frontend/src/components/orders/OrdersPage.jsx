import React, { useEffect, useState } from "react";
import styles from "./OrdersPage.module.css";

const OrdersPage = () => {
  const token = localStorage.getItem("access"); // Assuming token is stored in
  if (!token) {
    return (
      <>
        <p className={styles.noOrders}>
          Please Login first to see your all orders
        </p>
      </>
    );
  }
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the orders from the API
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access"); // Assuming token is stored in localStorage
        const response = await fetch(
          "http://localhost:8000/api/v3/fetch_orders/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className={styles.loading}>Loading orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.ordersContainer}>
      <h1 className={styles.title}>Your Orders</h1>
      {orders.length === 0 ? (
        <p className={styles.noOrders}>No orders found. Start shopping now!</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <div key={order.order_id} className={styles.orderCard}>
              <img
                src={order.image}
                alt={order.product}
                className={styles.productImage}
              />
              <div className={styles.orderDetails}>
                <h2 className={styles.productName}>{order.product}</h2>
                <p className={styles.orderPrice}>₹{order.price}</p>
                <p className={styles.orderDate}>
                  Ordered on:{" "}
                  {new Date(order.date_ordered).toLocaleDateString()}
                </p>
                <div className={styles.address}>
                  <h3>Delivery Address:</h3>
                  <p>
                    {order.address.street}, {order.address.house_number}
                  </p>
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
                  <p>Pincode: {order.address.pincode}</p>
                  <p>Near: {order.address.famous_location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
