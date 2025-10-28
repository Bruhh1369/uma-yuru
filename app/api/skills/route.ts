import { NextResponse } from "next/server";
import skills from "@/app/api/data/SkillsList.json";

export async function GET() {
    return NextResponse.json(skills)
}