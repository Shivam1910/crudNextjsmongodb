"use client";
import React, { useEffect, useState } from 'react';
import RemoveBtn from './RemoveBtn';
import Link from 'next/link';
import { HiPencilAlt } from 'react-icons/hi';
import axios from 'axios';

const TopicList = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const apiUrl = process.env.API_URL;
                const response = await axios.get(`${apiUrl}/api/topics`, {
                    // headers: { 'Cache-Control': 'no-cache' },
                });

                setTopics(response.data.topics);
            } catch (error) {
                console.log('Error loading topics:', error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <>
            {topics.map((t) => (
                <div
                    key={t._id}
                    className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                >
                    <div>
                        <h2 className="font-bold text-2xl">{t.title}</h2>
                        <div>{t.description}</div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TopicList;
