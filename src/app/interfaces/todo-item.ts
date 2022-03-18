export interface TodoItem {
    title: string
    completed?: boolean
}

export interface TodoItemUpdate {
    item: TodoItem,
    completed: boolean
}
