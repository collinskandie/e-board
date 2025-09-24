import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col, Modal, Form, Input, Select, TimePicker, Button, Tooltip } from 'antd';
import CalendarData from './CalendarData';
import dayjs from 'dayjs';
import { CalendarOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const badgeColors = [
	'pink',
	'red',
	'yellow',
	'orange',
	'cyan',
	'green',
	'blue',
	'purple',
	'geekblue',
	'magenta',
	'volcano',
	'gold',
	'lime',
];

const initialFormValues = {
	title: '',
	start: dayjs('00:00:00', 'HH:mm:ss'),
	end: dayjs('00:00:00', 'HH:mm:ss'),
	bullet: badgeColors[0]
}

const dateFormat = 'DD MMMM'

const AgendaList = props => {
	const { list, onDelete } = props
	return (
		list.map(list => (
			<div key={list.date} className="calendar-list">
				<h4>
					<CalendarOutlined />
					<span className="ml-2">{list.date}</span>
				</h4>
				{
					list.event.map((eventItem, i) => (
						<div key={`${eventItem.title}-${i}`} className="calendar-list-item">
							<div className="d-flex">
								<Badge className="mr-2" color={eventItem.bullet} />
								<div>
									<h5 className="mb-1">{eventItem.title}</h5>
									<span className="text-muted">{eventItem.start} - {eventItem.end}</span>
								</div>
							</div>
							<div className="calendar-list-item-delete">
								<Tooltip title="Delete event">
									<DeleteOutlined onClick={() => onDelete(list.date, i)} />
								</Tooltip>
							</div>
						</div>
					))
				}
			</div>
		))
	)
}

const EventModal = ({ open, addEvent, cancel }) => {
	const [form] = Form.useForm();
	const [meetingType, setMeetingType] = useState("physical");
	const [agendas, setAgendas] = useState([]);
	const [agendaInput, setAgendaInput] = useState("");

	const onSubmit = values => {
		const finalValues = {
			...values,
			meetingType,
			agendas,
		};
		addEvent(finalValues);
		setAgendas([]);
		setMeetingType("physical");
	};

	useEffect(() => {
		form.setFieldsValue(initialFormValues);
	});

	const handleAddAgenda = () => {
		if (agendaInput.trim()) {
			setAgendas([...agendas, agendaInput.trim()]);
			setAgendaInput("");
		}
	};

	const handleRemoveAgenda = index => {
		setAgendas(agendas.filter((_, i) => i !== index));
	};

	return (
		<Modal
			title="New Board Meeting"
			open={open}
			footer={null}
			destroyOnClose={true}
			onCancel={cancel}
		>
			<Form
				form={form}
				layout="vertical"
				name="new-event"
				preserve={false}
				onFinish={onSubmit}
			>
				<Form.Item name="title" label="Meeting Title">
					<Input autoComplete="off" placeholder="e.g. Q3 Board Review" />
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name="start" label="Start">
							<TimePicker className="w-100" format="HH:mm" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="end" label="End">
							<TimePicker className="w-100" format="HH:mm" />
						</Form.Item>
					</Col>
				</Row>

				{/* Meeting type */}
				<Form.Item label="Meeting Type">
					<Select value={meetingType} onChange={val => setMeetingType(val)}>
						<Option value="physical">Physical</Option>
						<Option value="online">Online</Option>
					</Select>
				</Form.Item>

				{/* Meeting link if online */}
				{meetingType === "online" && (
					<Form.Item name="meetingLink" label="Meeting Link">
						<Input placeholder="Paste online meeting link (Zoom, Teams...)" />
					</Form.Item>
				)}

				{/* Agendas */}
				<Form.Item label="Agenda Items">
					<Input.Group compact>
						<Input
							value={agendaInput}
							onChange={e => setAgendaInput(e.target.value)}
							placeholder="Add agenda item"
							style={{ width: "calc(100% - 80px)" }}
						/>
						<Button type="dashed" onClick={handleAddAgenda}>
							Add
						</Button>
					</Input.Group>
					<ul style={{ marginTop: 10 }}>
						{agendas.map((item, i) => (
							<li key={i} style={{ display: "flex", justifyContent: "space-between" }}>
								{item}
								<Button
									type="link"
									danger
									size="small"
									onClick={() => handleRemoveAgenda(i)}
								>
									Remove
								</Button>
							</li>
						))}
					</ul>
				</Form.Item>

				{/* Participants */}
				<Form.Item name="participants" label="Participants">
					<Select
						mode="multiple"
						placeholder="Select participants"
						allowClear
					>
						<Option value="alice">Alice Johnson</Option>
						<Option value="bob">Bob Smith</Option>
						<Option value="charlie">Charlie Lee</Option>
						<Option value="diana">Diana Patel</Option>
					</Select>
				</Form.Item>

				<Form.Item name="bullet" label="Label">
					<Select>
						{badgeColors.map(elm => (
							<Option value={elm} key={elm}>
								<Badge color={elm} />
								<span className="text-capitalize font-weight-semibold">{elm}</span>
							</Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item className="text-right mb-0">
					<Button type="primary" htmlType="submit">
						Add Meeting
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};


const CalendarApp = () => {
	const [calendarList, setCalendarList] = useState(CalendarData);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const cellRender = value => {
		const listData = getListData(value.format((dateFormat)));
		return (
			<ul className="calendar-event">
				{listData.map((item, i) => (
					<li key={`${item.title}-${i}`}>
						<Badge color={item.bullet} text={item.title} />
					</li>
				))}
			</ul>
		);
	}

	const getListData = (value) => {
		let listData = [];
		calendarList.forEach(elm => {
			if (elm.date === value) {
				listData = elm.event
			}
		})
		return listData;
	}

	const onSelect = value => {
		const selectedDate = value.format((dateFormat))
		setModalVisible(true);
		setSelectedDate(selectedDate)
	}

	const onDeleteEvent = (date, index) => {
		const data = calendarList.map(calendarList => {
			if (calendarList.date === date) {
				calendarList.event = calendarList.event.filter((_, i) => i !== index)
			}
			return calendarList
		}).filter(elm => elm.event.length !== 0)
		setCalendarList(data)
	}

	const onAddEvent = values => {
		const data = [{
			title: values.title ? values.title : 'Untitled Event',
			bullet: values.bullet,
			start: values.start.format(('HH:mm A')),
			end: values.end.format(('HH:mm A')),
		}]
		const newCalendarArr = calendarList
		const isExistingDate = newCalendarArr.find(x => x.date === selectedDate)
		if (isExistingDate) {
			for (let elm of newCalendarArr) {
				if (elm.date === selectedDate) {
					elm.event = [...elm.event, ...data]
				}
			}
		} else {
			newCalendarArr.push({ date: selectedDate, event: data })
		}
		const sortedNewCalendarArr = newCalendarArr.sort((a, b) => dayjs(a.date) - dayjs(b.date))
		setModalVisible(false)
		setCalendarList(sortedNewCalendarArr)
	}

	const onAddEventCancel = () => {
		setModalVisible(false)
	}

	return (
		<Card className="calendar mb-0">
			<Row>
				<Col xs={24} sm={24} md={9} lg={6}>
					<h2 className="mb-4">Agenda</h2>
					<AgendaList
						list={calendarList}
						onDelete={onDeleteEvent}
					/>
				</Col>
				<Col xs={24} sm={24} md={15} lg={18}>
					<Calendar
						onSelect={val => onSelect(val)}
						dateCellRender={cellRender}
					/>
				</Col>
			</Row>
			<EventModal
				open={modalVisible}
				addEvent={onAddEvent}
				cancel={onAddEventCancel}
			/>
		</Card>
	)
}

export default CalendarApp

