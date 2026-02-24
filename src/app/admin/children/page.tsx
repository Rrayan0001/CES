import prisma from "@/lib/prisma";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteChild } from "@/app/actions/children";

export default async function AdminChildrenPage() {
    const children = await prisma.child.findMany({
        orderBy: { date: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Children</h1>
                <Link
                    href="/admin/children/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    <Plus size={18} />
                    Add New Child
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Profile</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Age</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Location</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children.map((child) => (
                                <tr key={child.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="p-4">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                                            {child.image ? (
                                                <Image src={`/uploads/${child.image}`} alt={child.fullName} fill className="object-cover" />
                                            ) : (
                                                <span className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{child.fullName}</td>
                                    <td className="p-4 text-gray-600">{child.age} yrs</td>
                                    <td className="p-4 text-gray-600">{child.address}</td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition" title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <form action={async () => {
                                            "use server";
                                            await deleteChild(child.id);
                                        }}>
                                            <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {children.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No children profiles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
