import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
    const session = await auth();

    if (!session || session.user?.role !== "sponsor") {
        redirect("/login");
    }

    const sponsorId = parseInt(session.user.id);
    const sponsor = await prisma.sponsor.findUnique({
        where: { id: sponsorId },
    });

    if (!sponsor) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <nav className="w-full bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="text-xl font-bold text-gray-900">CES</span>
                    </Link>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Edit Profile</h1>
                    <p className="text-gray-600">Update your personal information and password.</p>
                </div>

                <EditProfileForm sponsor={{
                    id: sponsor.id,
                    fullName: sponsor.fullName,
                    username: sponsor.username,
                    email: sponsor.email,
                    contact: sponsor.contact,
                    address: sponsor.address,
                    message: sponsor.message,
                }} />
            </main>
        </div>
    );
}
