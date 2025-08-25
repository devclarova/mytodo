import { useState } from 'react';
import { TodoType } from './types/todoType';
import TodoWrite from './components/TodoWrite';
import TodoList from './components/TodoList';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  max-width: 480px;
  min-height: 400px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 12px;
  background: #faffe2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #8b87d6;
  }
`;

const GuideBox = styled.div`
  position: absolute;
  top: 50px;
  left: 40px;
  background: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;

  h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const handleTodoUpdate = (newTodo: TodoType): void => {
    setTodos(prev => [newTodo, ...prev]);
    setEditingId(null);
  };

  const onToggle = (id: string): void => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const onDelete = (id: string): void => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const onEdit = (id: string, newTitle: string): void => {
    setTodos(prev => prev.map(item => (item.id === id ? { ...item, title: newTitle } : item)));
  };

  return (
    <Container>
      {showGuide ? (
        <GuideBox>
          <h2>안내문</h2>
          <p>이 앱은 간단한 할 일 관리 앱 MyTodo입니다.</p>
          <ul>
            <li>1. 상단 입력창에 할 일을 입력하고 추가하세요.</li>
            <li>2. 완료하면 체크박스를 누르세요.</li>
            <li>3. 수정 버튼으로 내용을 수정하세요.</li>
            <li>4. 삭제 버튼으로 삭제하세요.</li>
          </ul>
          <ConfirmButton onClick={() => setShowGuide(false)}>확인</ConfirmButton>
        </GuideBox>
      ) : (
        <>
          <h1>MyTodo</h1>
          <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        </>
      )}
    </Container>
  );
}

export default App;
