// src/components/OrderList.js
import React from 'react';

function OrderList({ orders, onOrderSelect }) {
  return (
    <div>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="mb-2 p-2 border border-gray-300 rounded">
            <div>
              <strong>Order ID:</strong> {order.id}
            </div>
            <div>
              <strong>Customer:</strong> {order.customer}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Items:</strong> {order.items.length}
            </div>
            <button
              onClick={() => onOrderSelect(order)}
              className="mt-2 bg-green-500 text-white p-1 rounded"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
