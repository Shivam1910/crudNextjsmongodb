
import connectMongoDB from "@/config/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newDescription: description } = await request.json();
        await connectMongoDB();
        await Topic.findByIdAndUpdate(id, { title, description });

        return NextResponse.json({ message: "Topic updated" }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const topic = await Topic.findOne({ _id: id });

        return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}