import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import Link from "next/link";
import { Heart, User, Calendar, LogOut, BookOpen } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default async function SponsorDashboardPage() {
    const session = await auth();

    if (!session || session.user?.role !== "sponsor") {
        redirect("/login");
    }

    const sponsorId = parseInt(session.user.id);

    const sponsor = await prisma.sponsor.findUnique({
        where: { id: sponsorId },
        include: {
            sponsorships: {
                include: {
                    child: true
                }
            }
        }
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
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <User size={16} />
                            {sponsor.fullName}
                        </div>
                        <form action={logout}>
                            <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800 transition flex items-center gap-2">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">My Dashboard</h1>
                    <p className="text-gray-600 text-lg">Manage your profile and view the children you are supporting.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Profile Info */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6 h-fit">
                        <div className="text-center pb-6 border-b border-gray-100">
                            <div className="w-24 h-24 bg-indigo-50 text-indigo-200 rounded-full mx-auto flex items-center justify-center mb-4">
                                <User size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{sponsor.fullName}</h2>
                            <p className="text-sm text-gray-500">@{sponsor.username}</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                <p className="text-sm text-gray-900 font-medium break-all">{sponsor.email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                                <p className="text-sm text-gray-900 font-medium">{sponsor.contact}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                                <p className="text-sm text-gray-900 font-medium">{sponsor.address}</p>
                            </div>
                        </div>
                        <Link href="/dashboard/edit" className="block w-full text-center bg-indigo-50 text-indigo-700 font-medium px-4 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition text-sm">
                            Edit Profile
                        </Link>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">

                        <div className="bg-white rounded-3xl shadow-sm border border-indigo-100 p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-indigo-950 mb-6 flex items-center gap-2">
                                    <BookOpen className="text-indigo-600" />
                                    Children You Support
                                </h3>

                                {sponsor.sponsorships.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {sponsor.sponsorships.map((sponsorship) => (
                                            <Link href={`/children/${sponsorship.child.id}`} key={sponsorship.id} className="group block bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:bg-indigo-50/50 transition">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-indigo-700 transition">{sponsorship.child.fullName}</h4>
                                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Active</span>
                                                </div>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <p className="flex justify-between">
                                                        <span>Monthly Support</span>
                                                        <span className="font-semibold text-gray-900">Rs. {sponsorship.amount}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span>Started On</span>
                                                        <span className="font-medium">{new Date(sponsorship.date).toLocaleDateString()}</span>
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                                        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">No active sponsorships</h4>
                                        <p className="text-gray-500 mb-6">You haven't sponsored a child yet.</p>
                                        <Link href="/children" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition">
                                            Browse Children
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Heart size={200} fill="currentColor" className="text-indigo-600 translate-x-12 -translate-y-12 rotate-12" />
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}
