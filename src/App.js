import React, { useState } from 'react';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import Inventory from './components/Inventory';

const initialData = {
  orders: [
    {
      id: 1,
      customer: "Customer A",
      items: [
        { id: 1, name: "Item 1", quantity: 5 },
        { id: 2, name: "Item 2", quantity: 3 }
      ],
      status: "Pending"
    },
    {
      id: 2,
      customer: "Customer B",
      items: [
        { id: 1, name: "Item 1", quantity: 2 },
        { id: 3, name: "Item 3", quantity: 1 }
      ],
      status: "Completed"
    }
  ],
  items: [
    { id: 1, name: "Item 1", stock: 20 },
    { id: 2, name: "Item 2", stock: 15 },
    { id: 3, name: "Item 3", stock: 10 }
  ]
};

function App() {
  const [data, setData] = useState(initialData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ customer: '', items: [], status: 'Pending' });
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleCompleteOrder = (orderId) => {
    setData(prevData => ({
      ...prevData,
      orders: prevData.orders.map(order =>
        order.id === orderId ? { ...order, status: 'Completed' } : order
      )
    }));
  };

  const handleAddItem = (newItem) => {
    setData(prevData => ({
      ...prevData,
      items: [...prevData.items, { ...newItem, id: prevData.items.length + 1 }]
    }));
  };

  const handleDeleteItem = (itemId) => {
    setData(prevData => ({
      ...prevData,
      items: prevData.items.filter(item => item.id !== itemId)
    }));
  };

  const handleAddOrder = () => {
    setData(prevData => ({
      ...prevData,
      orders: [...prevData.orders, { ...newOrder, id: prevData.orders.length + 1 }]
    }));
    setNewOrder({ customer: '', items: [], status: 'Pending' });
  };

  const handleAddItemToOrder = (orderId, newItem) => {
    setData(prevData => ({
      ...prevData,
      orders: prevData.orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: [...order.items, { ...newItem, id: order.items.length + 1 }]
            }
          : order
      )
    }));
  };

  const handleAddItemToNewOrder = () => {
    const selectedItem = data.items.find(item => item.id === parseInt(selectedItemId, 10));
    setNewOrder(prevOrder => ({
      ...prevOrder,
      items: [...prevOrder.items, { ...selectedItem, quantity: parseInt(quantity, 10) }]
    }));
    setSelectedItemId('');
    setQuantity('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl mb-4">Order List</h2>
          <OrderList orders={data.orders} onOrderSelect={setSelectedOrder} />
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <OrderDetails
            order={selectedOrder}
            items={data.items}
            onComplete={handleCompleteOrder}
            onAddItem={handleAddItemToOrder}
          />
        </div>
      </div>
      <Inventory items={data.items} onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} />
      <div className="mt-4 bg-white shadow-md rounded p-4">
        <h2 className="text-2xl mb-2">Add New Order</h2>
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customer}
            onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded w-full lg:w-auto"
          />
          <div className="flex mb-2 lg:ml-4">
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="mr-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Item</option>
              {data.items.map(item => (
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
            <button
              onClick={handleAddItemToNewOrder}
              className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Add Item
            </button>
          </div>
          <button
            onClick={handleAddOrder}
            className="bg-blue-500 text-white p-2 rounded self-start lg:self-center"
          >
            Add Order
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-xl mb-2">Items in New Order</h3>
          <ul>
            {newOrder.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
