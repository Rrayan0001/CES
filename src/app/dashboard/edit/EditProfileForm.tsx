"use client";

import { useTransition, useState } from "react";
import { updateSponsorProfile, updateSponsorPassword } from "@/app/actions/profile";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Save, Lock } from "lucide-react";

interface EditProfileFormProps {
    sponsor: {
        id: number;
        fullName: string;
        username: string;
        email: string;
        contact: string;
        address: string;
        message: string | null;
    };
}

export default function EditProfileForm({ sponsor }: EditProfileFormProps) {
    const [isPending, startTransition] = useTransition();
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const promise = updateSponsorProfile(sponsor.id, formData);
            toast.promise(promise, {
                loading: "Saving changes...",
                success: "Profile updated!",
                error: "Failed to update.",
            });
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setPasswordError(null);
        startTransition(async () => {
            const result = await updateSponsorPassword(sponsor.id, formData);
            if (result) {
                setPasswordError(result);
                toast.error(result);
            } else {
                toast.success("Password changed successfully!");
                (e.target as HTMLFormElement).reset();
            }
        });
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    return (
        <div className="space-y-8">
            {/* Profile Info Section */}
            <motion.form
                initial="hidden" animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                onSubmit={handleProfileSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Save size={20} className="text-indigo-600" /> Edit Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input name="fullName" defaultValue={sponsor.fullName} required
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Username</label>
                        <input value={sponsor.username} disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input value={sponsor.email} disabled
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Contact Number</label>
                        <input name="contact" defaultValue={sponsor.contact} required
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <input name="address" defaultValue={sponsor.address} required
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </motion.div>
                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Bio / Message</label>
                        <textarea name="message" rows={3} defaultValue={sponsor.message || ""}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </motion.div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={isPending}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-indigo-400 text-sm">
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </motion.form>

            {/* Change Password Section */}
            <motion.form
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                onSubmit={handlePasswordSubmit}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-indigo-600" /> Change Password
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <input name="currentPassword" type="password" required
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input name="newPassword" type="password" required minLength={6}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input name="confirmNewPassword" type="password" required minLength={6}
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black" />
                    </div>
                </div>
                {passwordError && (
                    <p className="mt-3 text-sm text-red-500 bg-red-50 p-3 rounded-lg">{passwordError}</p>
                )}
                <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={isPending}
                        className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-900 transition disabled:bg-gray-400 text-sm">
                        {isPending ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </motion.form>
        </div>
    );
}
