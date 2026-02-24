"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSponsor(id: number) {
    await prisma.sponsor.delete({
        where: { id }
    });

    revalidatePath("/admin/sponsors");
}
