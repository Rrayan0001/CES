export const dynamic = 'force-dynamic';

import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ArrowLeft, MapPin, Calendar, Languages, User } from "lucide-react";

export default async function ChildProfilePage({ params }: { params: { id: string } }) {
    const child = await prisma.child.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!child) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-20">
            <nav className="w-full bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link href="/children" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back to Children</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="text-xl font-bold text-gray-900">CES</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-96 md:h-full bg-indigo-50 min-h-[400px]">
                            {child.image ? (
                                <Image src={`/uploads/${child.image}`} alt={child.fullName} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-indigo-300">
                                    <Heart size={64} />
                                </div>
                            )}
                        </div>

                        <div className="p-8 md:p-12 pl-12 flex flex-col">
                            <div className="mb-8">
                                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{child.fullName}</h1>
                                <p className="text-xl text-indigo-600 font-medium">{child.age} years old</p>
                            </div>

                            <div className="space-y-6 mb-10 flex-1">
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="p-3 bg-gray-50 rounded-xl"><MapPin className="text-gray-400" size={24} /></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Location</p>
                                        <p className="font-medium text-gray-900">{child.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="p-3 bg-gray-50 rounded-xl"><Languages className="text-gray-400" size={24} /></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Language</p>
                                        <p className="font-medium text-gray-900">{child.language}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="p-3 bg-gray-50 rounded-xl"><User className="text-gray-400" size={24} /></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Religion</p>
                                        <p className="font-medium text-gray-900">{child.religion}</p>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">About {child.fullName.split(' ')[0]}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {child.message}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <Link
                                    href={`/sponsor/${child.id}`}
                                    className="w-full flex items-center justify-center gap-2 bg-rose-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-rose-600 transition shadow-lg shadow-rose-200"
                                >
                                    <Heart fill="currentColor" size={20} />
                                    Sponsor {child.fullName.split(' ')[0]}
                                </Link>
                                <p className="text-center text-sm text-gray-400 mt-4">100% of your donation goes directly to education support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
