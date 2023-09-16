import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  const tdl = useSelector((state) => state.todos.todos);
  const todo = useSelector((state) => state.todos.todos[tdl.length - 1]);

  return (
    <div className="max-w-md my-auto mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Confirmation Page</h1>
      <div className="mb-4">
        <p className="text-lg font-semibold">Title:</p>
        <p className="text-gray-800">{todo.title}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Description:</p>
        <p className="text-gray-800">{todo.description}</p>
      </div>
    { todo.dueDate && <div className="mb-4">
        <p className="text-lg font-semibold">Due Date:</p>
        <p className="text-gray-800">{todo.dueDate}</p>
      </div>}
     {todo.status && <div className="mb-4">
        <p className="text-lg font-semibold">Status:</p>
        <p className="text-gray-800">{todo.status}</p>
      </div>}
      <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
    </div>
  );
};

export default ConfirmationPage;
