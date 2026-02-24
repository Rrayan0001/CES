import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Users, HeartHandshake, Baby } from "lucide-react"

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
        redirect("/login");
    }

    const [totalChildren, totalSponsors, totalSponsorships] = await Promise.all([
        prisma.child.count(),
        prisma.sponsor.count(),
        prisma.sponsoredChild.count()
    ]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Baby size={32} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Children</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalChildren}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Registered Sponsors</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalSponsors}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-xl">
                        <HeartHandshake size={32} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Active Sponsorships</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalSponsorships}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Welcome back, {session.user?.name}</h2>
                <p className="text-gray-600">Use the sidebar to navigate through the admin panel and manage the platform.</p>
            </div>
        </div>
    )
}
