import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default async function ChildrenPage() {
    const children = await prisma.child.findMany({
        orderBy: { date: 'desc' },
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navigation */}
            <nav className="w-full bg-white border-b border-gray-100 pb-20 sticky top-0 z-50">
                {/* Same nav as homepage for now, abstract later if needed */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="text-xl font-bold text-gray-900">
                            CES
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Meet the Children</h1>
                    <p className="mt-4 text-xl text-gray-600">These children are waiting for a sponsor like you to help them get an education.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {children.map(child => (
                        <div key={child.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100 transition duration-300">
                            <div className="aspect-[4/3] w-full relative bg-gray-200 overflow-hidden">
                                {child.image ? (
                                    <Image
                                        src={`/uploads/${child.image}`}
                                        alt={child.fullName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                                        <Heart size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{child.fullName}</h3>
                                        <p className="text-sm text-gray-500">{child.age} years old • {child.address}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 line-clamp-3 mb-6 text-sm">
                                    {child.message}
                                </p>
                                <Link
                                    href={`/children/${child.id}`}
                                    className="inline-flex w-full items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-medium px-4 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition group-hover:bg-indigo-600 group-hover:text-white"
                                >
                                    View Profile
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                    {children.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-gray-100">
                            <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900">No children profiles found.</h3>
                            <p className="text-gray-500 mt-2">Check back later or contact administration.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
