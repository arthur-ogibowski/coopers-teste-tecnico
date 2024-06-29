import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTodos, addTodo, deleteTodo, toggleCompleteTodo, updateTodoOrder, updateTodoTitle, clearTodos } from '../../utils/api';
import styles from './Todos.module.css';
import completeIcon from '../../assets/completed.svg';
import mockCheckIcon from '../../assets/mock-check.svg';
import todoGraphic from '../../assets/todo-graphic.svg';

const Todos = ({ onLoginClick, showNotification }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [isNewTodoCompleted, setIsNewTodoCompleted] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    // Chama setTodos de /utils/api.js para buscar os itens
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
      }
    };

    // Se token existir (user logado), chama fetchTodos
    if (token) {
      fetchTodos();
    } else {
      // Mock data
      setTodos([
        { _id: '1', title: 'this is a new task', completed: false },
        { _id: '2', title: 'Develop Todo List page', completed: false },
        { _id: '3', title: 'Create drag and drop functionality', completed: false },
        { _id: '4', title: 'Add new tasks', completed: false },
        { _id: '5', title: 'Delete items', completed: false },
        { _id: '6', title: 'Clear all', completed: false },
        { _id: '7', title: 'Completed item goes to Completed list', completed: false },
        { _id: '8', title: 'This item label can be edited', completed: false },
        { _id: '9', title: 'Editing an item...', completed: false },
        { _id: '10', title: 'Get FTP credentials', completed: true },
        { _id: '11', title: 'Homepage design', completed: true },
        { _id: '12', title: 'Email John about deadline', completed: true },
        { _id: '13', title: 'Create folder in Google Drive', completed: true },
        { _id: '14', title: 'Send a gift to the client', completed: true },
      ]);
    }

    // Verifica se há notificação armazenada no localStorage
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification) {
      const { type, message } = JSON.parse(storedNotification);
      showNotification(type, message);
      localStorage.removeItem('notification');
    }
  }, [token, showNotification]);

  // Adiciona um novo item
  const handleAddTodo = async () => {
    // Se não houver token, mostra a modal de login
    if (!token) {
      onLoginClick();
      return;
    }

    // Se o título estiver vazio, retorna
    if (!title.trim()) {
      return;
    }

    try {
      // Chama addTodo de /utils/api.js para adicionar um novo item
      const newTodo = await addTodo(title, isNewTodoCompleted);
      setTodos([...todos, newTodo]);
      setTitle('');
      setIsNewTodoCompleted(false);
      showNotification('success', 'Task added');
    } catch (error) {
      showNotification('error', 'Error adding task');
    }
  };

  // Adiciona um novo item ao pressionar Enter
  const handleAddKeyDown = async (e) => {
    if (!token) {
      onLoginClick();
      return;
    }
    // Se a tecla pressionada for Enter, chama handleAddTodo
    if (e.key === 'Enter') {
      await handleAddTodo();
    }
  };

  // Deleta um item
  const handleDeleteTodo = async (id) => {
    if (!token) {
      onLoginClick();
      return;
    }

    // Chama deleteTodo de /utils/api.js para deletar um item
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      showNotification('success', 'Task deleted');
    } catch (error) {
      showNotification('error', 'Error deleting task');
    }
  };

  // Marca um item como completo ou incompleto
  const handleToggleComplete = async (id) => {
    if (!token) {
      onLoginClick();
      return;
    }
    const todo = todos.find((todo) => todo._id === id);

    try {
      // Chama toggleCompleteTodo de /utils/api.js para marcar um item como completo ou incompleto
      const updatedTodo = await toggleCompleteTodo(id, todo);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      if (todo.completed) {
        showNotification('success', 'Task marked incomplete');
      } else {
        showNotification('success', 'Task marked complete');
      }
    } catch (error) {
      showNotification('error', 'Error toggling task completion');
    }
  };

  // Move um item para a lista de completos ou incompletos, utilizando a biblioteca react-beautiful-dnd
  const handleDragEnd = async (result) => {
    if (!token) {
      onLoginClick();
      return;
    }
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const draggedTodo = todos.find((todo) => todo._id === result.draggableId);

    if (!draggedTodo) {
      return;
    }

    try {
      if (source.droppableId !== destination.droppableId) {
        const isCompleted = destination.droppableId === 'complete';
        const updatedTodo = await updateTodoOrder(draggedTodo._id, draggedTodo, isCompleted);
        setTodos((prevTodos) => {
          const updatedSourceList = prevTodos.filter((todo) => todo._id !== updatedTodo._id);
          if (isCompleted) {
            return [...updatedSourceList, updatedTodo];
          } else {
            return [updatedTodo, ...updatedSourceList];
          }
        });
      }
      showNotification('success', 'Task moved');
    } catch (error) {
      showNotification('error', 'Error updating task');
    }
  };

  // Edita o título de um item com um clique duplo
  const handleDoubleClick = (id, title) => {
    if (!token) {
      onLoginClick();
      return;
    }
    setEditingTodoId(id);
    setEditingTitle(title);
  };

  // Atualiza o título de um item
  const handleTitleChange = (e) => {
    if (!token) {
      onLoginClick();
      return;
    }
    setEditingTitle(e.target.value);
  };

  // Atualiza o título de um item ao perder o foco (click fora do campo de edição)
  const handleEditBlur = async (id) => {
    if (!token) {
      onLoginClick();
      return;
    }
    if (!editingTitle.trim()) {
      return;
    }

    try {
      // Chama updateTodoTitle de /utils/api.js para atualizar o título de um item
      const updatedTodo = await updateTodoTitle(id, editingTitle);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setEditingTodoId(null);
      showNotification('success', 'Task updated');
    } catch (error) {
      showNotification('error', 'Error updating task title');
    }
  };

  // Atualiza o título de um item ao pressionar Enter
  const handleEditKeyDown = (e, id) => {
    if (!token) {
      onLoginClick();
      return;
    }
    // Se a tecla pressionada for Enter, chama handleEditBlur
    if (e.key === 'Enter') {
      handleEditBlur(id);
    }
  };

  // Limpa todos os itens completos ou incompletos
  const handleClearAll = async (completed) => {
    if (!token) {
      onLoginClick();
      return;
    }
    try {
      // Chama clearTodos de /utils/api.js para limpar todos os itens completos ou incompletos
      await clearTodos(completed);
      setTodos(todos.filter((todo) => todo.completed !== completed));
      showNotification('success', 'Tasks cleared');
    } catch (error) {
      showNotification('error', 'Error clearing tasks');
    }
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <section className={styles.todos} id="todos">
      <img src={todoGraphic} alt="Todo List" className={styles.todoGraphic} />
      <div className={styles.header}>
        <div className={styles.headerBackground}></div>
        <h2 className={styles.title}>Todo List</h2>
        <p className={styles.subtitle}>
          Drag and drop to set your top priorities, mark when done, and create what's new.
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.todoLists}>
          <div className={[styles.todoColumn, styles.incompleteColumn].join(' ')}>
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>To-Do</h2>
              <h3 className={styles.listSubtitle}>Take a breath.</h3>
              <h3 className={styles.listSubtitle}>Start doing.</h3>
            </div>
            <Droppable droppableId="incomplete">
              {(provided) => (
                <ul className={styles.incompleteList} {...provided.droppableProps} ref={provided.innerRef}>
                  {token && (
                    <li className={styles.todoItem}>
                      <button
                        className={styles.addNewButton}
                        onClick={() => setIsNewTodoCompleted(!isNewTodoCompleted)}
                      >
                        {isNewTodoCompleted ? <img src={mockCheckIcon} alt="Complete" /> : null}
                      </button>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleAddKeyDown}
                        placeholder="Add a new task"
                        className={styles.addInput}
                      />
                    </li>
                  )}
                  {incompleteTodos.map((todo, index) => (
                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                      {(provided) => (
                        <li
                          className={`${styles.todoItem} ${token ? '' : styles.mockData}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onDoubleClick={() => handleDoubleClick(todo._id, todo.title)}
                        >
                          <button className={styles.incompleteButton} onClick={() => handleToggleComplete(todo._id)}>
                            {token ? null : <img src={mockCheckIcon} alt="Complete" />}
                          </button>
                          {editingTodoId === todo._id ? (
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={handleTitleChange}
                              onBlur={() => handleEditBlur(todo._id)}
                              onKeyDown={(e) => handleEditKeyDown(e, todo._id)}
                              autoFocus
                              className={styles.editingInput}
                            />
                          ) : (
                            <span className={styles.todoText}>{todo.title}</span>
                          )}
                          <button className={styles.deleteButton} onClick={() => handleDeleteTodo(todo._id)}>
                            Delete
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <button className={styles.eraseAllButton} onClick={() => handleClearAll(false)}>
              Clear All
            </button>
          </div>

          <div className={[styles.todoColumn, styles.completeColumn].join(' ')}>
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>Done</h2>
              <h3 className={styles.listSubtitle}>{completedTodos.length === 0 ? 'Nothing to show here.' : 'Congratulations!'}</h3>
              <h3 className={styles.listSubtitle}>
                <span className={styles.listSubtitleAccent}>
                  You have completed {completedTodos.length} task{completedTodos.length === 1 ? '' : 's'}
                </span>
              </h3>
            </div>
            <Droppable droppableId="complete">
              {(provided) => (
                <ul className={styles.completeList} {...provided.droppableProps} ref={provided.innerRef}>
                  {completedTodos.map((todo, index) => (
                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                      {(provided) => (
                        <li
                          className={styles.todoItem}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onDoubleClick={() => handleDoubleClick(todo._id, todo.title)}
                        >
                          <button className={styles.completeButton} onClick={() => handleToggleComplete(todo._id)}>
                            <img src={completeIcon} alt="Complete" />
                          </button>
                          {editingTodoId === todo._id ? (
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={handleTitleChange}
                              onBlur={() => handleEditBlur(todo._id)}
                              onKeyDown={(e) => handleEditKeyDown(e, todo._id)}
                              autoFocus
                              className={styles.editingInput}
                            />
                          ) : (
                            <span className={styles.todoText}>{todo.title}</span>
                          )}
                          <button className={styles.deleteButton} onClick={() => handleDeleteTodo(todo._id)}>
                            Delete
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <button className={styles.eraseAllButton} onClick={() => handleClearAll(true)}>
              Clear All
            </button>
          </div>
        </div>
      </DragDropContext>
    </section>
  );
};

export default Todos;
