import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { matchedTodosSelector } from '../../redux/selectors';
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { addTodoThunk } from './TodosSlice';
import { todosSlice } from './TodosSlice';

export default function TodoList() {
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const handleInputChange = (e) => {
    setTodoName(e.target.value)
  }
  const handlePriorityChange = (value) => {
    setPriority(value)
  }
  // dispatch
  const dispatch = useDispatch()

  // selector
  const todoList = useSelector(matchedTodosSelector)
  console.log(todoList)

  const handleAddBtnClick = () => {
    if (!todoName) {
      return
    }
    // dispatch(
    //   todosSlice.actions.addTodo({
    //   id: uuidv4(),
    //   name: todoName,
    //   priority: priority,
    //   completed: false
    // }))
    
    // dispatch thunk action creator
    dispatch(addTodoThunk({
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false
      }))
    setTodoName('')
    setPriority('Medium')
  }
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {/* <Todo name='Learn React' prioriry='High' />
        <Todo name='Learn Redux' prioriry='Medium' />
        <Todo name='Learn JavaScript' prioriry='Low' /> */}
        {todoList.map(todo => (
          <Todo key={todo.id} id={todo.id} name={todo.name} priority={todo.priority} completed={todo.completed}/>
      ))
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={handlePriorityChange}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddBtnClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
