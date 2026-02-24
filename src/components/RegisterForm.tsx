"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerSponsor } from "@/app/actions/register";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterForm() {
    const [errorMessage, dispatch] = useActionState(registerSponsor, undefined);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.07 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <form action={dispatch} className="space-y-5">
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                <motion.div variants={itemVariants}>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input id="fullName" name="fullName" type="text" required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input id="username" name="username" type="text" required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input id="contact" name="contact" type="text" required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input id="address" name="address" type="text" required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" required minLength={6}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" required minLength={6}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black" />
                    </div>
                </motion.div>
            </motion.div>

            {errorMessage && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                    {errorMessage}
                </motion.p>
            )}

            <SubmitButton />

            <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
            </p>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" aria-disabled={pending} disabled={pending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition-colors">
            {pending ? "Creating account..." : "Create Account"}
        </button>
    );
}
