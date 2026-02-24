import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { Heart } from "lucide-react";

export default async function LoginPage() {
    const session = await auth();

    // Redirect logged in users
    if (session?.user) {
        if (session.user.role === 'admin') {
            redirect('/admin/dashboard');
        } else {
            redirect('/dashboard');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-rose-50 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-gray-100">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <Heart className="text-rose-500" fill="currentColor" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">CES</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>
                <LoginForm />
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Create one</Link>
                </p>
            </div>
        </div>
    );
}

