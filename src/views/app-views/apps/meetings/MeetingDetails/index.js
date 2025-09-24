// MeetingDetails.js
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { MeetingContext } from "views/app-views/apps/MeetingContext";
import { Input, Button, Upload, Tabs, List, Typography } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title } = Typography;

const MeetingDetails = () => {
    const { id } = useParams();
    const { meetings } = useContext(MeetingContext);
    const meeting = meetings.find(m => m.id === parseInt(id));

    const [minutes, setMinutes] = useState(meeting?.minutes || "");
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");

    const handleAddMessage = () => {
        if (!message.trim()) return;
        setChat([...chat, { text: message, sender: "You", time: new Date().toLocaleTimeString() }]);
        setMessage("");
    };

    if (!meeting) return <p>Meeting not found</p>;

    return (
        <div className="flex gap-4">
            {/* Left side - main content */}
            <div className="flex-1 p-4 bg-white rounded-xl shadow">
                <Title level={3}>{meeting.title}</Title>
                <p><b>Date:</b> {meeting.date}</p>
                <p><b>Type:</b> {meeting.type}</p>
                <p><b>Agendas:</b> {meeting.agendas.join(", ")}</p>

                <Tabs defaultActiveKey="1">
                    {/* Minutes */}
                    <TabPane tab="Minutes" key="1">
                        <TextArea
                            rows={6}
                            value={minutes}
                            onChange={e => setMinutes(e.target.value)}
                            placeholder="Type meeting minutes here..."
                        />
                        <Button type="primary" className="mt-2">Save Minutes</Button>
                    </TabPane>

                    {/* Documents */}
                    <TabPane tab="Documents" key="2">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Upload Document</Button>
                        </Upload>
                        <List
                            className="mt-4"
                            dataSource={meeting.documents || []}
                            renderItem={(doc, i) => <List.Item>{doc}</List.Item>}
                        />
                    </TabPane>
                </Tabs>
            </div>

            {/* Right side - Chat */}
            <div className="w-80 p-4 bg-gray-50 rounded-xl shadow flex flex-col">
                <Title level={4}>Meeting Chat</Title>
                <div className="flex-1 overflow-y-auto border p-2 rounded bg-white">
                    {chat.map((c, idx) => (
                        <p key={idx}><b>{c.sender}:</b> {c.text} <small>({c.time})</small></p>
                    ))}
                </div>
                <div className="flex mt-2 gap-2">
                    <Input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type message..."
                    />
                    <Button icon={<SendOutlined />} onClick={handleAddMessage} />
                </div>
            </div>
        </div>
    );
};

export default MeetingDetails;
