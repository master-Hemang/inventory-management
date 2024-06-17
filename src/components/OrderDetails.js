// src/components/OrderDetails.js
import React, { useState } from 'react';

function OrderDetails({ order, items, onComplete, onAddItem }) {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  if (!order) return <div>Select an order to see details</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItem = items.find(item => item.id === parseInt(selectedItemId, 10));
    onAddItem(order.id, { ...selectedItem, quantity: parseInt(quantity, 10) });
    setSelectedItemId('');
    setQuantity('');
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-2xl mb-4">Order Details</h2>
      <div>
        <strong>Customer:</strong> {order.customer}
      </div>
      <div>
        <strong>Status:</strong> {order.status}
      </div>
      <ul className="mt-2">
        {order.items.map(item => (
          <li key={item.id} className="mb-1">
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onComplete(order.id)}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Complete Order
      </button>

      <div className="mt-4">
        <h2 className="text-2xl mb-2">Add New Item to Order</h2>
        <form onSubmit={handleSubmit} className="flex">
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderDetails;
