const TODOS = 'TODOS'; 
class Todo { 
    /** 
     * Creates todo element. 
     * @param {number} id Identifier. 
     * @param {string} [title] Title. Default is empty string. 
     */ 
    constructor(id, title = '') { 
        /** 
         * @type {number} 
         */ 
        this.id = id; 
        /** 
         * @type {string} 
         */ 
        this.title = title || ''; 
    } 
} 
 
 
class TodoService { 
    constructor() { 
        /** 
         * Todo list. 
         * @type {Todo[]}. 
         * @private  
         */ 
        this._todos = []; 
        this._init(); 
    } 
 
    /** 
     * Gets todos. 
     * @returns Todos array. 
     */ 
    getTodos() { 
        return [...this._todos]; 
    } 
 
    /** 
     * Adds new todo by title. 
     * @param {string} [title] - Todo title. Default is empty string. 
     */ 
    addTodo(title = '') { 
 
        // if (!this._todos.some(t => !t.title)) { 
        //     const todo = { id: this._generateId(), title }; 
        //     this._todos = [todo, ...this._todos]; 
        //     this._commit(); 
        //     return todo; 
        // } 
        // throw new Error('There is empty element in todo list'); 
 
 
 
 
 
        this._todos = [...this._todos, { id: this._generateId(), title }]; 
        this._commit(); 
    } 
 
    /** 
     * Edits todo by identifier. 
     * @param {number} id Todo's id. 
     * @param {string} title Title. 
     * @throws Throws error when title argument is empty. 
     */ 
    editTodo(id, title) { 
 
        // if (title) { 
        //     const todos = [...this._todos]; 
        //     todos[this._getIndex(id)].title = title; 
        //     this._todos = todos; 
        //     this._commit(); 
        // } else { 
        //     throw new Error('You can not change title to empty, for delete element, click delete button.'); 
        // } 
 
 
 
        const todos = [...this._todos]; 
        todos[this._getIndex(id)].title = title; 
        this._todos = todos; 
 
        this._commit(); 
    } 
 
    /** 
     * Delete todo by identifier. 
     * @param {number} id Todo's identifier. 
     */ 
    deleteTodo(id) { 
        this._todos = this._todos.filter(t => t.id !== id); 
 
        this._commit(); 
    } 
 
    /** 
     * Sort todo array. 
     * @param {boolean?} direction Sorting direction. Default is true.  
     */ 
    sortTodos(direction = true) { 
        const todos = [...this._todos].filter(t => t.title).sort((t1, t2) => t1.title.toUpperCase() > t2.title.toUpperCase() ? 1 : -1); 
 
        if (!direction) 
            todos.reverse(); 
 
        this._todos = todos; 
 
        this._commit(); 
    } 
 
    /** 
     * Initialize todos from storage. 
     * @private 
     */ 
    _init() { 
        const todos = JSON.parse(localStorage.getItem(TODOS) || '[]'); 
 
    } 
 
 
    /** 
     * Commits changes to storage. 
     * @private 
     */ 
    _commit() { 
        localStorage.setItem(TODOS, JSON.stringify(this._todos)); 
    } 
 
    /** 
     * Generates next available id or 1 if todo array is empty. 
     * @private 
     * @returns {number} Id. 
     */ 
    _generateId() { 
        return this._todos?.length ? [...this._todos].sort((t1, t2) => t2.id - t1.id)[0].id + 1 : 1; 
    } 
 
    /** 
     * Gets index of todo in "todo" array. 
     * @private 
     * @param {number} id Todo identifier. 
     * @throws Throws error when there are no todo with given id. 
     * @returns Index of todo in "todos" array. 
     */ 
    _getIndex(id) { 
        const index = this._todos.findIndex(t => t.id === id); 
        if (index !== -1) { 
            return index; 
        } 
        throw new Error(`There are no such todo with ${id} id.`) 
    } 
} 
 
const service = new TodoService(); 
 
service.addTodo('Fidan'); 
service.addTodo('Abdullah'); 
service.addTodo('Biyaliyev'); 
service.addTodo('Cefer'); 
service.addTodo('Derya'); 
 
service.editTodo(3, 'Bilesuvar'); 
 
service.sortTodos();