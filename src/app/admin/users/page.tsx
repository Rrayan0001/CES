import prisma from "@/lib/prisma";
import { Users, Shield, Calendar } from "lucide-react";

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        include: { role: true },
        orderBy: { date: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {users.length} user{users.length !== 1 ? "s" : ""}
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {user.firstName} {user.middleName ? user.middleName + " " : ""}{user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.mobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                                        <Shield size={12} />
                                        {user.role?.name || "Admin"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {new Date(user.date).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No admin users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
