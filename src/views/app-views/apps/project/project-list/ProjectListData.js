const MeetingListData = [
  {
    id: 101,
    title: "Q1 Board Review",
    type: "Physical",
    date: "2025-10-02",
    startTime: "11:00 AM",
    endTime: "1:00 PM",
    meetingLink: "",
    agendas: [
      "Financial performance overview",
      "Departmental updates",
      "Approval of new policies"
    ],
    statusColor: "cyan",
    participants: [
      {
        name: "Frederick Adams",
        img: "/img/avatars/thumb-8.jpg",
        avatarColor: ""
      },
      {
        name: "Joyce Freeman",
        img: "/img/avatars/thumb-5.jpg",
        avatarColor: ""
      },
      {
        name: "Clayton Bates",
        img: "",
        avatarColor: "cyan"
      }
    ]
  },
  {
    id: 102,
    title: "Product Launch Strategy",
    type: "Online",
    date: "2025-10-05",
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    meetingLink: "https://zoom.us/j/123456789",
    agendas: [
      "Marketing campaign rollout",
      "Sales targets discussion",
      "Assign follow-up tasks"
    ],
    statusColor: "red",
    participants: [
      {
        name: "Eileen Horton",
        img: "/img/avatars/thumb-1.jpg",
        avatarColor: ""
      },
      {
        name: "Gabriel Frazier",
        img: "",
        avatarColor: "blue"
      }
    ]
  },
  {
    id: 103,
    title: "Tech Infrastructure Planning",
    type: "Physical",
    date: "2025-10-12",
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    meetingLink: "",
    agendas: [
      "Server migration plan",
      "Budget allocation",
      "Vendor contracts"
    ],
    statusColor: "orange",
    participants: [
      {
        name: "Debra Hamilton",
        img: "",
        avatarColor: "gold"
      },
      {
        name: "Stacey Ward",
        img: "",
        avatarColor: "purple"
      },
      {
        name: "Ron Vargas",
        img: "/img/avatars/thumb-3.jpg",
        avatarColor: ""
      }
    ]
  }
];

export default MeetingListData;
