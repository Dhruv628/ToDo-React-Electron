export const addTodo=item=>({
    type:"ADD",
    payload:item
})
export const removeFromTodo=item=>({
    type:"REMOVE",
    payload:item
})
export const updateInToDo=item=>({
    type:"UPDATE",
    payload:item
})