import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, HeartHandshake, LogOut, Settings, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
        redirect("/login");
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-700">CES Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/children" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        <Users size={20} />
                        <span className="font-medium">Children</span>
                    </Link>
                    <Link href="/admin/sponsors" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        <HeartHandshake size={20} />
                        <span className="font-medium">Sponsors</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        <ShieldCheck size={20} />
                        <span className="font-medium">Admin Users</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                        <Settings size={20} />
                        <span className="font-medium">Settings & Workflow</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <form action={logout}>
                        <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm sticky top-0 z-10 p-4 flex justify-between md:justify-end items-center">
                    <div className="md:hidden">
                        <span className="text-xl font-bold text-indigo-700">CES</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Logged in as <strong>{session.user.name}</strong></span>
                    </div>
                </header>
                <div className="p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
