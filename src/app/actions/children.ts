"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function createChild(formData: FormData) {
    const fullName = formData.get("fullName") as string;
    const dobStr = formData.get("dob") as string;
    const religion = formData.get("religion") as string;
    const language = formData.get("language") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;
    const height = parseInt(formData.get("height") as string);
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File | null;
    let imageFilename = "";

    if (imageFile && imageFile.name && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public/uploads");
        await mkdir(uploadsDir, { recursive: true });

        imageFilename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const filePath = path.join(uploadsDir, imageFilename);

        await writeFile(filePath, buffer);
    }

    const dob = new Date(dobStr);
    const age = new Date().getFullYear() - dob.getFullYear();

    await prisma.child.create({
        data: {
            fullName,
            dob,
            age,
            religion,
            language,
            contact,
            address,
            height,
            message,
            image: imageFilename,
        }
    });

    revalidatePath("/admin/children");
    revalidatePath("/children");
}

export async function deleteChild(id: number) {
    await prisma.child.delete({
        where: { id }
    });

    revalidatePath("/admin/children");
    revalidatePath("/children");
}
