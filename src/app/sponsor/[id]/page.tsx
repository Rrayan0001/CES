import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { createSponsorship } from "@/app/actions/sponsor";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import SponsorForm from "./SponsorForm";

export default async function SponsorChildPage({ params }: { params: { id: string } }) {
    const session = await auth();

    // They must be logged in as a sponsor to perform this action in this new flow
    if (!session || session.user?.role !== "sponsor") {
        redirect(`/login?callbackUrl=/sponsor/${params.id}`);
    }

    const child = await prisma.child.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!child) {
        notFound();
    }

    async function handleSponsorship(formData: FormData) {
        "use server";
        // Inject the logged in user ID and details
        formData.append("sponsorId", session!.user!.id);
        formData.append("sponsorFullName", session!.user!.name || "Anonymous Sponsor");

        await createSponsorship(formData);
        redirect(`/dashboard?success=true&child=${child!.id}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans py-12">
            <main className="max-w-3xl mx-auto px-4 w-full">

                <Link href={`/children/${child.id}`} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-medium">
                    <ArrowLeft size={16} />
                    Go Back
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Heart size={200} fill="currentColor" className="text-rose-500 translate-x-12 -translate-y-12 rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commit to Sponsorship</h1>
                        <p className="text-gray-600 mb-8 text-lg">You are choosing to sponsor <strong className="text-indigo-600">{child.fullName}</strong>. Please enter the amount you wish to contribute monthly towards their education.</p>

                        <SponsorForm action={handleSponsorship} childId={child.id} childName={child.fullName} />
                    </div>
                </div>
            </main>
        </div>
    );
}
