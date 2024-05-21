import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useState } from 'react';
import { prioritiesFilterChange, searchFilterChange, statusFilterChange } from '../../redux/actions';
import { useDispatch } from 'react-redux'
import { filtersSlice } from './FiltersSlice';

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState('')
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value))
  }

  const [filterStatus, setFilterStatus] = useState('All')
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value)
    dispatch(filtersSlice.actions.statusFilterChange(e.target.value))
  }

  const [filterPriorities, setFilterPriorities] = useState([])
  const handlePrioritiesChange = (value) => {
    setFilterPriorities(value)
    dispatch(filtersSlice.actions.prioritiesFilterChange(value))
  }
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search value={searchText} onChange={handleSearchTextChange} placeholder='input search text' />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleStatusChange}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          value={filterPriorities}
          onChange={handlePrioritiesChange}
          style={{ width: '100%' }}
        >
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
      </Col>
    </Row>
  );
}
