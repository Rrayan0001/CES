"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateSponsorProfile(sponsorId: number, formData: FormData) {
    const fullName = formData.get("fullName") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;
    const message = formData.get("message") as string;

    await prisma.sponsor.update({
        where: { id: sponsorId },
        data: { fullName, contact, address, message },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/edit");
}

export async function updateSponsorPassword(sponsorId: number, formData: FormData) {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (newPassword !== confirmNewPassword) {
        return "New passwords do not match.";
    }

    if (newPassword.length < 6) {
        return "New password must be at least 6 characters.";
    }

    const sponsor = await prisma.sponsor.findUnique({ where: { id: sponsorId } });
    if (!sponsor) return "Sponsor not found.";

    const isMatch = await bcrypt.compare(currentPassword, sponsor.password);
    if (!isMatch) return "Current password is incorrect.";

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.sponsor.update({
        where: { id: sponsorId },
        data: { password: hashed },
    });

    return null; // success
}
