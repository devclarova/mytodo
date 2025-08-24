import styled from '@emotion/styled';
import { TodoType } from '../types/todoType';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 20px;
`;

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  setEditingId,
}: TodoListProps) => {
  if (todos.length === 0) {
    return <EmptyMessage>할 일이 없습니다</EmptyMessage>;
  }

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          isEditing={editingId === todo.id}
          setEditingId={setEditingId}
        />
      ))}
    </List>
  );
};

export default TodoList;
