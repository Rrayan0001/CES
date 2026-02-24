import prisma from "@/lib/prisma";
import { Trash2, HandHeart } from "lucide-react";
import { deleteSponsor } from "@/app/actions/sponsors";

export default async function AdminSponsorsPage() {
    const sponsors = await prisma.sponsor.findMany({
        include: {
            sponsorships: true
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Manage Sponsors</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Sponsor Name</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Contact</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Sponsored Children</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sponsors.map((sponsor) => (
                                <tr key={sponsor.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">{sponsor.fullName}</div>
                                        <div className="text-sm text-gray-500">@{sponsor.username}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-gray-900">{sponsor.email}</div>
                                        <div className="text-sm text-gray-500">{sponsor.contact}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <HandHeart size={16} className="text-indigo-500" />
                                            <span className="font-semibold text-gray-700">{sponsor.sponsorships.length}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <form action={async () => {
                                            "use server";
                                            await deleteSponsor(sponsor.id);
                                        }}>
                                            <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {sponsors.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No sponsors found.
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
