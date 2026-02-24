"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerSponsor(prevState: string | undefined, formData: FormData) {
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;

    if (!fullName || !username || !email || !password || !contact || !address) {
        return "All fields are required.";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match.";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters.";
    }

    try {
        // Check if username or email already exists
        const existingUser = await prisma.sponsor.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        });

        if (existingUser) {
            return "An account with this username or email already exists.";
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.sponsor.create({
            data: {
                fullName,
                username,
                email,
                password: hashedPassword,
                contact,
                address,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return "Something went wrong. Please try again.";
    }

    redirect("/login?registered=true");
}
