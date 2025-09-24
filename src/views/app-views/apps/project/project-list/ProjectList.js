import React, { useState } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Radio, Button, Row, Col, Tooltip, Tag, Avatar, Menu, Card } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';
import MeetingListData from './ProjectListData';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	EyeOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs'
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import utils from 'utils';

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const ItemAction = ({ id, removeId }) => (
	<EllipsisDropdown
		menu={
			<Menu>
				<Menu.Item key="0">
					<EyeOutlined />
					<span className="ml-2">View</span>
				</Menu.Item>
				<Menu.Item key="1">
					<EditOutlined />
					<span className="ml-2">Edit</span>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="2" onClick={() => removeId(id)}>
					<DeleteOutlined />
					<span className="ml-2">Delete Meeting</span>
				</Menu.Item>
			</Menu>
		}
	/>
)

const ItemHeader = ({ title, type }) => (
	<div>
		<h4 className="mb-0">{title}</h4>
		<span className="text-muted">{type}</span>
	</div>
)

const ItemInfo = ({ date, startTime, endTime, agendas, statusColor }) => {
	const daysLeft = dayjs(date).diff(dayjs(), 'day')
	return (
		<Flex alignItems="center">
			<div className="mr-3">
				<Tooltip title="Agendas">
					<CheckCircleOutlined className="text-muted font-size-md" />
					<span className="ml-1 text-muted">{agendas.length}</span>
				</Tooltip>
			</div>
			<div>
				<Tag color={statusColor !== "none" ? statusColor : ''}>
					<ClockCircleOutlined />
					<span className="ml-2 font-weight-semibold">
						{date} ({startTime} - {endTime})
					</span>
				</Tag>
				{daysLeft >= 0 && (
					<span className="ml-2 text-muted">{daysLeft} days left</span>
				)}
			</div>
		</Flex>
	)
}

const ItemMember = ({ participants }) => (
	<>
		{participants.map((elm, i) => (
			i <= 2 ?
				<Tooltip title={elm.name} key={`avatar-${i}`}>
					<Avatar size="small" className={`ml-1 cursor-pointer ant-avatar-${elm.avatarColor}`} src={elm.img} >
						{!elm.img && <span className="font-weight-semibold font-size-sm">{utils.getNameInitial(elm.name)}</span>}
					</Avatar>
				</Tooltip>
				: null
		))}
		{participants.length > 3 &&
			<Tooltip title={`${participants.length - 3} More`}>
				<Avatar size={25} className="ml-1 cursor-pointer bg-white border font-size-sm">
					<span className="text-gray-light font-weight-semibold">+{participants.length - 3}</span>
				</Avatar>
			</Tooltip>
		}
	</>
)

const ListItem = ({ data, removeId }) => (
	<Card>
		<Row align="middle">
			<Col xs={24} sm={24} md={8}>
				<ItemHeader title={data.title} type={data.type} />
			</Col>
			<Col xs={24} sm={24} md={10}>
				<ItemInfo
					date={data.date}
					startTime={data.startTime}
					endTime={data.endTime}
					agendas={data.agendas}
					statusColor={data.statusColor}
				/>
			</Col>
			<Col xs={24} sm={24} md={4}>
				<ItemMember participants={data.participants} />
			</Col>
			<Col xs={24} sm={24} md={2}>
				<div className="text-right">
					<ItemAction id={data.id} removeId={removeId} />
				</div>
			</Col>
		</Row>
	</Card>
)

const GridItem = ({ data, removeId }) => (
	<Card>
		<Flex alignItems="center" justifyContent="space-between">
			<ItemHeader title={data.title} type={data.type} />
			<ItemAction id={data.id} removeId={removeId} />
		</Flex>
		<div className="mt-2">
			<ItemInfo
				date={data.date}
				startTime={data.startTime}
				endTime={data.endTime}
				agendas={data.agendas}
				statusColor={data.statusColor}
			/>
		</div>
		<div className="mt-3">
			<ItemMember participants={data.participants} />
		</div>
	</Card>
)

const MeetingList = () => {
	const [view, setView] = useState(VIEW_GRID);
	const [list, setList] = useState(MeetingListData);

	const onChangeMeetingView = e => setView(e.target.value)

	const deleteItem = id => {
		const data = list.filter(elm => elm.id !== id)
		setList(data)
	}

	return (
		<>
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="space-between" alignItems="center" className="py-4">
						<h2>Meetings</h2>
						<div>
							<Radio.Group defaultValue={VIEW_GRID} onChange={onChangeMeetingView}>
								<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
								<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
							</Radio.Group>
							<Button type="primary" className="ml-2">
								<PlusOutlined />
								<span>New</span>
							</Button>
						</div>
					</Flex>
				</div>
			</PageHeaderAlt>
			<div className={`my-4 ${view === VIEW_LIST ? 'container' : 'container-fluid'}`}>
				{
					view === VIEW_LIST ?
						list.map(elm => <ListItem data={elm} removeId={id => deleteItem(id)} key={elm.id} />)
						:
						<Row gutter={16}>
							{list.map(elm => (
								<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
									<GridItem data={elm} removeId={id => deleteItem(id)} />
								</Col>
							))}
						</Row>
				}
			</div>
		</>
	)
}

export default MeetingList
