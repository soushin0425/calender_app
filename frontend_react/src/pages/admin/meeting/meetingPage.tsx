import Header from "../../../components/header/header";
import "./meetingPage.css";

// GOOGLE_CALENDER_API_KEY
// VITE_APP_GOOGLE_CALENDER_API_KEY
// GOOGLE_CALENDER_ID
// VITE_APP_GOOGLE_CALENDER_ID

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MeetingPage: React.FC = () => {

    // 予定の追加
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        title: '',
        target: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = () => {
        console.log('予定追加:', formData);
        // 必要があればここでサーバに送る、状態に追加する等
        alert('予定を追加しました');
        setFormData({
            date: '',
            startTime: '',
            endTime: '',
            title: '',
            target: '',
        });
    };

    return (
        <div>
            <Header title="ミーティング" />

            <div className="main_layout">
                <div className="tab_container">左にタブ</div>

                <div className="content_area">
                    <div className="top_row">
                        <div className="calendar">中心にカレンダー</div>
                        <div className="add_meeting">
                            <h2>予定の追加</h2>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="日付"
                            />
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder="開始時間"
                            />
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                placeholder="終了時間"
                            />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="予定のタイトル"
                            />
                            <input
                                type="text"
                                name="target"
                                value={formData.target}
                                onChange={handleChange}
                                placeholder="対象者"
                            />
                            <button onClick={handleSubmit}>追加</button>
                        </div>

                    </div>
                    <div className="detail">下予定の詳細</div>
                </div>
            </div>
        </div>
    );
};

export default MeetingPage;