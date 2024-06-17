// src/components/Inventory.js
import React, { useState } from 'react';

function Inventory({ items, onAddItem, onDeleteItem }) {
  const [newItem, setNewItem] = useState({ name: '', stock: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ ...newItem, stock: parseInt(newItem.stock, 10) });
    setNewItem({ name: '', stock: '' });
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Inventory</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className="mb-2 p-2 border border-gray-300 rounded">
            <div>
              <strong>{item.name}</strong>
            </div>
            <div>
              Stock: {item.stock}
            </div>
            <button
              onClick={() => onDeleteItem(item.id)}
              className="mt-2 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-2xl mb-2">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newItem.stock}
            onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inventory;
