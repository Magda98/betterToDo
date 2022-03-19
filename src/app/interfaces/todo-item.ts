export interface TodoItem {
    _id?: string,
    title: string,
    completed?: boolean,
}

export interface TodoItemUpdate {
    item: TodoItem,
    completed: boolean
}
