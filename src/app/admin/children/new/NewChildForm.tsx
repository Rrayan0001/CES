"use client";

import { useTransition } from "react";
import { createChild } from "@/app/actions/children";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function NewChildForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const promise = createChild(formData).then(() => {
                router.push("/admin/children");
            });

            toast.promise(promise, {
                loading: 'Creating profile...',
                success: 'Profile created successfully!',
                error: 'Failed to create profile.',
            });
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input name="fullName" type="text" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                    <input name="dob" type="date" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Religion</label>
                    <input name="religion" type="text" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Language</label>
                    <input name="language" type="text" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Contact Number</label>
                    <input name="contact" type="text" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <input name="address" type="text" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Height (cm/feet)</label>
                    <input name="height" type="number" required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Profile Image</label>
                    <input name="image" type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Personal Message / Biography</label>
                <textarea name="message" rows={4} required className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"></textarea>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex justify-end">
                <button type="submit" disabled={isPending} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-indigo-400">
                    {isPending ? "Saving..." : "Save Profile"}
                </button>
            </motion.div>
        </motion.form>
    );
}
