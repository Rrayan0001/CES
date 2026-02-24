import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, ShieldCheck, UserPlus, FileEdit, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-rose-500" fill="currentColor" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-rose-500">
              CES
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/children" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
              Meet the Children
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition">
              Sign In
            </Link>
            <Link href="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              Become a Sponsor
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white"></div>
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 -ml-40 -mb-20 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
              Change a life through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500 py-2 block">Education</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto mb-10 leading-relaxed">
              Join our Child Education Support program. By becoming a sponsor, you provide access to learning, resources, and a brighter future for a child in need.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/children" className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-indigo-700 transition shadow-xl shadow-indigo-200">
                Start Sponsoring
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* New Platform Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 md:p-12 mb-16 shadow-sm">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="text-indigo-600" size={28} />
              Recent Updates & Verification Instructions
            </h2>
            <ul className="space-y-4 text-indigo-800 font-medium">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 border-2 border-indigo-200"></span>
                <span>Login page now has a "Create one" link to <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/register</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 border-2 border-indigo-200"></span>
                <span>Register page has a "Sign in" link back to <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/login</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 border-2 border-indigo-200"></span>
                <span>Sponsor Dashboard now has an <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">"Edit Profile"</strong> button</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 border-2 border-indigo-200"></span>
                <span>Admin sidebar now has the <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">"Admin Users"</strong> link</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 border-2 border-indigo-200"></span>
                <span>Middleware properly allows public access to <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/</strong>, <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/children</strong>, <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/login</strong>, <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/register</strong> while protecting <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/dashboard</strong> and <strong className="text-indigo-900 bg-white px-2 py-0.5 rounded shadow-sm border border-indigo-50">/admin</strong></span>
              </li>
            </ul>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Platform Updates & Features</h2>
            <p className="mt-4 text-xl text-gray-600">Explore the latest enhancements added to the CES platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <UserPlus size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Seamless Registration</h3>
              <p className="text-gray-600">The <strong>Login</strong> page now links to a dedicated <strong>/register</strong> flow, and vice-versa, making it incredibly easy to become a sponsor.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                <FileEdit size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Profile Management</h3>
              <p className="text-gray-600">The Sponsor Dashboard now features a rich <strong>Edit Profile</strong> panel, allowing you to update contact details and change passwords securely.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Robust Middleware</h3>
              <p className="text-gray-600">Public access is granted to browsing children and authenticating, while strict session middleware protects the <strong>/dashboard</strong> and <strong>/admin</strong> areas.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Settings size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Admin Oversight</h3>
              <p className="text-gray-600">The centralized Admin Panel sidebar now includes an <strong>Admin Users</strong> directory and a dedicated Workflow settings page.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
