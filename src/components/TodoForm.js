import React from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTodo} from "../redux/todoActions";
import ListItems from "./ListItems";
const { Option } = Select;

const TodoForm = () => {

  //Converting Date function
  const convertDate = (IncomingDate) => {
    const dateString = IncomingDate;
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const navigate = useNavigate();
  //Fetching To-Do list Data from State
  const tdl = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  
  //Saving the To-Do Data
  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate
        ? convertDate(values.dueDate.toISOString())
        : null,
    };
    navigate("/confirmation");
    dispatch(addTodo(formattedValues));
  };

  return (
    <div className="max-w-xl mx-auto px-6 pt-5 pb-10 bg-white rounded-lg shadow-md">
      {/* Task Input Form  */}
    <Form onFinish={onFinish} layout="vertical">
       <h1 className="text-3xl font-semibold tracking-wider mb-6">Add New Task</h1>
       {/* Title  */}
       <Form.Item label="Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
        <Input placeholder="Title" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
      </Form.Item>
      {/* Description  */}
      <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is required" }]}>
        <Input.TextArea placeholder="Description" className="border border-gray-300 rounded-lg" style={{minHeight:"6rem"}}/>
      </Form.Item>
      {/* Due Date  */}
      <Form.Item label="Due Date" name="dueDate">
        <DatePicker placeholder="Select Date (Optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
      </Form.Item>
      {/* Status  */}
      <Form.Item label="Status " className="" name="status">
        <Select placeholder="Status (Optional)" className="w-full  rounded-lg  h-12  ">
          <Option value="To Do">To Do</Option>
          <Option value="Ongoing">Ongoing</Option>
          <Option value="Stalled">Stalled</Option>
          <Option value="Done">Done</Option>
        </Select>
      </Form.Item>
      {/* Add button  */}
      <Form.Item>
        <Button className="bg-blue-500  tracking-widest text-white w-full h-12 t text-lg rounded-lg" type="primary" htmlType="submit">
         ADD
        </Button>
      </Form.Item>
    </Form>
    {/* List Items  */}
    <div>
     <ListItems/>
    </div>
    {/* To Performance  */}
    {tdl.length>0 && <div className="mt-6 text-center">
      <Link to="/performance" className="text-blue-500 hover:underline float-left">
        View Your Performance
      </Link>
    </div>}
  </div>
  );
};

export default TodoForm;



