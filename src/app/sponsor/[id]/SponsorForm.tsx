"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

interface SponsorFormProps {
    action: (formData: FormData) => Promise<void>;
    childId: number;
    childName: string;
}

export default function SponsorForm({ action, childId, childName }: SponsorFormProps) {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const promise = action(formData);
            toast.promise(promise, {
                loading: 'Processing sponsorship commitment...',
                success: 'Thank you for your commitment!',
                error: 'Failed to process request.',
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
            className="space-y-6 max-w-xl"
        >
            <input type="hidden" name="childId" value={childId} />

            <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Sponsorship Amount (NPR)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rs.</span>
                    <input
                        name="amount"
                        type="number"
                        required
                        defaultValue="5000"
                        className="w-full text-2xl font-bold text-gray-900 rounded-xl border-2 border-indigo-100 p-4 pl-12 focus:border-indigo-500 focus:ring-0 outline-none transition transition-all"
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">Recommended minimum amount is Rs. 5000 / month.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-indigo-50 p-4 rounded-xl flex gap-4 text-indigo-800 border border-indigo-100">
                <CheckCircle2 className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">
                    By submitting this form, you commit to supporting {childName.split(' ')[0]}'s education. A representative will contact you shortly to finalize the payment process.
                </p>
            </motion.div>

            <motion.div variants={itemVariants}>
                <button type="submit" disabled={isPending} className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:bg-indigo-400">
                    <Heart fill="currentColor" size={20} />
                    {isPending ? "Confirming..." : "Confirm Sponsorship"}
                </button>
            </motion.div>
        </motion.form>
    );
}
