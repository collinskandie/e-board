import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col, Modal, Form, Input, Select, TimePicker, Button, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { CalendarOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { MeetingContext } from "views/app-views/apps/MeetingContext";
import { useNavigate } from "react-router-dom";

import { APP_PREFIX_PATH } from 'configs/AppConfig'

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

const AgendaList = ({ list = [], onDelete }) => {
	const navigate = useNavigate();
	if (!Array.isArray(list)) return null;

	return list.map(meeting => (
		<div key={meeting.id} className="calendar-list">
			<h4>
				<CalendarOutlined />
				<span className="ml-2">{meeting.date}</span>
			</h4>

			<div className="calendar-list-item">
				<div className="d-flex">
					<Badge className="mr-2" color={meeting.statusColor} />
					<div>
						<h5 className="mb-1">{meeting.title}</h5>
						<span className="text-muted">
							{meeting.startTime} - {meeting.endTime}
						</span>
					</div>

				</div>

				<div style={{ marginTop: 8 }}>
					<strong>Agendas:</strong>
					<ul>
						{meeting.agendas.map((a, i) => (
							<li key={i}>{a}</li>
						))}
					</ul>
				</div>

				<div className="calendar-list-item-delete">
					<Tooltip title="View details">
						<Button
							type="link"
							icon={<EyeOutlined />}
							onClick={() => navigate(`${APP_PREFIX_PATH}/apps/meetings/details/${meeting.id}`)}
						>
							View
						</Button>
					</Tooltip>
					<Tooltip title="Delete meeting">
						<DeleteOutlined onClick={() => onDelete(meeting.id)} />
					</Tooltip>
				</div>
			</div>
		</div>
	));
};


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
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const { meetings, addMeeting, deleteMeeting } = useContext(MeetingContext);

	const getListData = (value) => {
		const dateStr = dayjs(value).format(dateFormat);
		const dayMeetings = meetings.filter(d => d.date === dateStr); // <-- always array
		return dayMeetings;
	};


	const onAddEvent = (values) => {
		const data = {
			id: Date.now(),
			date: selectedDate,   // add selected date here
			title: values.title || "Untitled Event",
			statusColor: values.bullet,
			startTime: values.start.format("HH:mm A"),
			endTime: values.end.format("HH:mm A"),
			type: values.meetingType,
			agendas: values.agendas || [],
			participants: values.participants || [],
			meetingLink: values.meetingLink || null,
		};
		addMeeting(data);
		setModalVisible(false);
	};


	const onDeleteEvent = (date, index) => {
		deleteMeeting(date, index);
	};

	const cellRender = (value) => {

		const listData = getListData(value);

		return (
			<ul className="calendar-event">
				{listData.map((item, i) => (
					<li key={`${item.id}-${i}`}>
						<Badge
							color={item.statusColor}
							text={`${item.title} (${item.startTime} - ${item.endTime})`}
						/>
					</li>
				))}
			</ul>
		);
	};


	const onSelect = (value) => {
		setSelectedDate(value.format(dateFormat));
		setModalVisible(true);
	};

	return (
		<Card className="calendar mb-0">
			<Row>
				<Col xs={24} sm={24} md={9} lg={6}>
					<h2 className="mb-4">Agenda</h2>
					<AgendaList
						list={meetings}
						onDelete={deleteMeeting}
					/>

				</Col>
				<Col xs={24} sm={24} md={15} lg={18}>
					<Calendar
						onSelect={onSelect}
						dateCellRender={cellRender}
					/>
				</Col>
			</Row>
			<EventModal
				open={modalVisible}
				addEvent={onAddEvent}
				cancel={() => setModalVisible(false)}
			/>
		</Card>
	);
};

export default CalendarApp;

