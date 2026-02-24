"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSponsorship(formData: FormData) {
    const childId = parseInt(formData.get("childId") as string);
    const sponsorId = formData.get("sponsorId") ? parseInt(formData.get("sponsorId") as string) : undefined;

    const sponsorFullName = formData.get("sponsorFullName") as string;
    const amount = formData.get("amount") as string;

    await prisma.sponsoredChild.create({
        data: {
            childId,
            sponsorId,
            fullName: sponsorFullName,
            amount,
        }
    });

    revalidatePath("/admin/sponsors");
    revalidatePath("/dashboard");
}
