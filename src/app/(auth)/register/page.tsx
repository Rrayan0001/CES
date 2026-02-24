import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-rose-50 p-4">
            <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">CES</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Become a Sponsor</h2>
                    <p className="mt-2 text-sm text-gray-600">Create an account to start sponsoring a child's education.</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}
