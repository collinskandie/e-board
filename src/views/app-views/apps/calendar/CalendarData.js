import dayjs from 'dayjs';

const m = new Date().getMonth();
const y = new Date().getFullYear();

const getDate = (date) => dayjs(new Date(y, m, date)).format('DD MMMM')

const CalendarData = [
	{
		date: getDate(2),
		event: [
			{
				title: 'Board Strategy Meeting',
				bullet: 'cyan',
				start: '10:00am',
				end: '12:30pm',
			}
		]
	},
	{
		date: getDate(5),
		event: [
			{
				title: 'Audit & Risk Committee',
				bullet: 'red',
				start: '9:00am',
				end: '11:00am',
			},
			{
				title: 'Governance & HR Committee',
				bullet: 'blue',
				start: '2:00pm',
				end: '4:00pm',
			}
		]
	},
	{
		date: getDate(15),
		event: [
			{
				title: 'Annual General Meeting (AGM)',
				bullet: 'gold',
				start: '11:00am',
				end: '2:00pm',
			}
		]
	},
	{
		date: getDate(22),
		event: [
			{
				title: 'ICT & Innovation Sub-Committee',
				bullet: 'purple',
				start: '3:00pm',
				end: '5:00pm',
			}
		]
	},
	{
		date: getDate(28),
		event: [
			{
				title: 'Full Board Meeting',
				bullet: 'green',
				start: '9:30am',
				end: '1:00pm',
			}
		]
	}
]

export default CalendarData
