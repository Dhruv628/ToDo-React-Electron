const initialState = {
    todos: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          todos: [...state.todos, action.payload],
        };
      case "REMOVE":
        return {
          ...state,
          todos: state.todos.filter((_, index) => index !== action.payload),
        };
      case "UPDATE":
        const { id, updatedToDo } = action.payload;
        return {
          ...state,
          todos: state.todos.map((element, index) => {
            if (index === id) {
              return updatedToDo;
            } else {
              return element;
            }
          }),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  