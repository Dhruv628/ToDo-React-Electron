import React from 'react'
import { removeFromTodo, updateInToDo } from "../redux/todoActions";
import { useDispatch, useSelector } from "react-redux";
const ListItems = () => {
    const dispatch=useDispatch();
    const tdl=useSelector((state)=>state.todos.todos)
  return (

    <div className="mt-10">
        {/* Heading  */}
      <h1 className="text-xl font-semibold mb-4 uppercase tracking-wider">Tasks</h1>
      <div>
        {/* Items in To Do List ? */}
        {tdl.length > 0 && tdl.map((e, index) => (
            //  Details 
            <div key={index} className={`p-4 border border-gray-200  rounded-lg mb-4 `}>
              <div className="text-xl">{e.title}</div>
              <div className={"mt-2 text-zinc-800 "}>{e.description}</div>
              <div className="flex justify-between">
                {e.dueDate && <div className="mt-2 text-sm">Due Date: {e.dueDate}</div>}
                {e.status && <div className="mt-2 text-sm">Status: {e.status}</div>}
              </div>
             {/* Delete Button  */}
              <div className="mt-4 flex items-center  justify-between">
                <button  className="text-red-500   hover:text-red-700" onClick={() => {dispatch(removeFromTodo(index));}} >
                   <i class="fa-regular fa-trash-can scale-[0.9]"></i> Delete 
                </button>
              {/* Change Status  */}
                <div>
                <i class="fa-regular fa-pen-to-square mr-3 scale-[1.4]"></i>
                <select className="border hover:cursor-pointer border-gray-300 rounded-sm px-3 py-1 text-sm" value={e.status}
                    onChange={(event) => {
                    const updatedStatus = event.target.value;
                    const id = index;
                    const updatedToDo = { ...e, status: updatedStatus };
                    dispatch(updateInToDo({ id, updatedToDo }));
                  }}>
                  <option value="" disabled>Status</option>
                  <option value="To Do">To Do</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Stalled">Stalled</option>
                  <option value="Done">Done</option>
                </select>
                </div>
              </div>
            </div>
          ))}
      </div>
       {/*No items in To Do List ? */}
      <div>
        {tdl.length===0 && <><div>There are no tasks currently, add tasks to the list.</div></>}
      </div>
    </div>
  )
}

export default ListItems