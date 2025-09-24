// 📊 Attendance & Participation Trends (instead of VisitorChartData)
export const AttendanceChartData = {
	series: [
		{
			name: "Average Attendance (%)",
			data: [85, 92, 78, 74, 83, 76, 81, 80, 66, 78, 85, 88]
		},
		{
			name: "Agenda Items Discussed",
			data: [5, 6, 8, 4, 3, 5, 7, 6, 4, 8, 6, 7]
		}
	],
	categories: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]
}

// 📅 Annual Stats (Meetings summary)
export const AnnualStatisticData = [
	{
		title: 'Total Meetings',
		value: '20',
		status: 0,
		subtitle: `Board meetings held this year`
	},
	{
		title: 'Physical Meetings',
		value: '10',
		status: 0,
		subtitle: `In-person board sessions`
	},
	{
		title: 'Virtual Meetings',
		value: '10',
		status: 0,
		subtitle: `Conducted via Zoom/Teams`
	}
]

// 👥 Active Board Members (instead of ActiveMembersData)
export const ActiveMembersData = [{
	name: 'Active Members',
	data: [12, 10, 14, 12, 16, 11, 15, 13, 17] // example: monthly active participants
}]

// 🆕 New Board Members / Appointments
export const NewMembersData = [
	{
		img: "/img/avatars/thumb-2.jpg",
		title: "Finance Director",
		name: "Mwangi Kamau",
	},
	{
		img: "/img/avatars/thumb-3.jpg",
		title: "Legal Advisor",
		name: "Achieng Otieno",
	},
	{
		img: "/img/avatars/thumb-4.jpg",
		title: "HR & Governance",
		name: "Mutiso Njoroge",
	},
	{
		img: "/img/avatars/thumb-5.jpg",
		title: "ICT & Innovation",
		name: "Joyce Wambui",
	},
	{
		img: "/img/avatars/thumb-6.jpg",
		title: "Risk & Compliance",
		name: "Fatuma Abdi",
	}
]

// ✅ Recent Decisions / Resolutions (instead of RecentTransactionData)
export const RecentResolutionsData = [
	{
		id: '#BR-101',
		name: 'Audit Committee',
		date: '8 May 2024',
		decision: 'Annual financials approved',
		status: 'Approved',
		avatarColor: '#04d182'
	},
	{
		id: '#BR-102',
		name: 'Governance Committee',
		date: '6 May 2024',
		decision: 'New policy framework adopted',
		status: 'Approved',
		avatarColor: '#fa8c16'
	},
	{
		id: '#BR-103',
		name: 'HR Committee',
		date: '1 May 2024',
		decision: 'Staff restructuring proposal',
		status: 'Pending',
		avatarColor: '#1890ff'
	},
	{
		id: '#BR-104',
		name: 'Risk & Compliance',
		date: '28 April 2024',
		decision: 'Third-party audit engagement',
		status: 'Rejected',
		avatarColor: '#ffc542'
	},
	{
		id: '#BR-105',
		name: 'ICT & Innovation',
		date: '28 April 2024',
		decision: 'Upgrade to digital board pack system',
		status: 'Approved',
		avatarColor: '#ff6b72'
	}
]
