"use client"
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RemoveBtn = ({ id }) => {
    const removeTopic = async () => {
        const confirmed = window.confirm('Are you sure?');

        if (confirmed) {
            try {
                const response = await axios.delete(`/api/topics?id=${id}`);
                if (response.status === 200) {

                    toast.success('Topic deleted successfully!');
                    window.location.reload();

                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <button onClick={removeTopic} className="text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    );
};

export default RemoveBtn;
