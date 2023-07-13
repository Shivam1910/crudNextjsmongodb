
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const AddTopic = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error('Title and description are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/topics', {
                title,
                description,
            });

            if (response.status === 201) {
                const timestamp = new Date().toLocaleTimeString();
                toast.success(`Topic created successfully at ${timestamp}!`);
                router.push('/');
            } else {
                throw new Error('Failed to create a topic');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to create a topic. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Topic Title"
                />

                <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Topic Description"
                />

                <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                    Add Topic
                </button>
            </form>
        </>
    );
};

export default AddTopic;
