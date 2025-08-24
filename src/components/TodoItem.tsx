import { useState } from 'react';
import styled from '@emotion/styled';
import { TodoType } from '../types/todoType';

const Item = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #eee;
  background: ${({ completed }) => (completed ? '#fafafa' : '#fff')};
`;

const Checkbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #bbb;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:checked {
    background-color: #4a90e2;
    border-color: #4a90e2;
  }

  &:checked::after {
    content: '✔';
    position: absolute;
    top: -2px;
    left: 2px;
    font-size: 14px;
    color: white;
  }
`;

const Title = styled.span<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  transition:
    color 0.2s,
    text-decoration 0.2s;
  color: ${({ completed }) => (completed ? '#999' : '#222')};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const Input = styled.input`
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.1s;

  &:active {
    transform: scale(0.95);
  }
`;

const EditButton = styled(Button)`
  background: #e6f0ff;
  color: #0052cc;
  &:hover {
    background: #cce0ff;
  }
`;

const DeleteButton = styled(Button)`
  background: #ffe6e6;
  color: #cc0000;
  &:hover {
    background: #ffcccc;
  }
`;

const SaveButton = styled(Button)`
  background: #e6ffe6;
  color: #008000;
  &:hover {
    background: #ccffcc;
  }
`;

const CancelButton = styled(Button)`
  background: #f0f0f0;
  color: #555;
  &:hover {
    background: #e0e0e0;
  }
`;

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  isEditing: boolean;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit, isEditing, setEditingId }: TodoItemProps) => {
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(todo.id, editTitle);
      setEditingId(null);
    }
  };

  return (
    <Item completed={todo.completed}>
      {isEditing ? (
        <>
          <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          <SaveButton onClick={handleSave}>저장</SaveButton>
          <CancelButton onClick={() => setEditingId(null)}>취소</CancelButton>
        </>
      ) : (
        <>
          <Checkbox type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
          <Title completed={todo.completed}>{todo.title}</Title>
          <EditButton onClick={() => setEditingId(todo.id)}>수정</EditButton>
          <DeleteButton onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
        </>
      )}
    </Item>
  );
};

export default TodoItem;
