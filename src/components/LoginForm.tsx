"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(login, undefined);

    return (
        <form action={dispatch} className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email or Username
                </label>
                <div className="mt-1">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                    />
                </div>
            </motion.div>

            {errorMessage && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500"
                >
                    {errorMessage}
                </motion.p>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <SubmitButton />
            </motion.div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition-colors"
        >
            {pending ? "Signing in..." : "Sign in"}
        </button>
    );
}
