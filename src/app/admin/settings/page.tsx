import { Info, HelpCircle, User, ShieldCheck, Heart } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings & Workflow</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Info size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">How the Platform Works</h2>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Welcome to the Next.js version of the Child Education Support (CES) administration panel.
                    This platform connects generous sponsors with children in need of dedicated educational support.
                    Below is an overview of the platform's primary workflows to help you manage the data effectively.
                </p>

                <div className="space-y-12">

                    {/* Workflow Step 1 */}
                    <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg z-10">1</div>
                            <div className="w-0.5 h-full bg-gray-100 -mt-2"></div>
                        </div>
                        <div className="pb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Adding Children to the System</h3>
                            <p className="text-gray-600">
                                As an administrator, your primary task is to maintain the database of children requiring support.
                                Navigate to the <strong>Manage Children</strong> tab and use the "Add New Child" form to create a profile.
                                Ensure you upload a clear photo and provide a compelling biography. Once added, the child is immediately visible on the public sponsor-facing website.
                            </p>
                        </div>
                    </div>

                    {/* Workflow Step 2 */}
                    <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg z-10">2</div>
                            <div className="w-0.5 h-full bg-gray-100 -mt-2"></div>
                        </div>
                        <div className="pb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Sponsor Registration & Connectivity</h3>
                            <p className="text-gray-600">
                                Sponsors visit the public website to browse the children's profiles. If a sponsor decides to support a child, they must first create an account and log in.
                                This ensures that their commitment is tied securely to a verified identity.
                            </p>
                        </div>
                    </div>

                    {/* Workflow Step 3 */}
                    <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg z-10">3</div>
                            <div className="w-0.5 h-full bg-gray-100 -mt-2"></div>
                        </div>
                        <div className="pb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Sponsorship Commitment phase</h3>
                            <p className="text-gray-600">
                                Once logged in, the sponsor can click the "Sponsor" button on a child's profile. They will be directed to a form where they pledge a monthly amount (NPR).
                                Upon submission, the platform creates a secure <strong>Sponsorship Link</strong> between that child and the sponsor.
                            </p>
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mt-4 flex gap-3 text-amber-800">
                                <HelpCircle className="shrink-0" />
                                <span className="text-sm">
                                    <em>Note:</em> The current system handles the *pledge*. Actual online payment gateway integration (like eSewa or Khalti) would be considered a future platform expansion. For now, this requires manual follow-up from the NGO based on the system records.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Step 4 */}
                    <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg z-10">4</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Ongoing Management</h3>
                            <p className="text-gray-600">
                                Sponsors can log into their Sponsor Dashboard at any time to view the active children they are supporting.
                                Administrators use the <strong>Manage Sponsors</strong> tab in this admin panel to monitor the sponsor database and track total connections.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-emerald-500" /> Administrative Notice
                    </h4>
                    <p className="text-sm text-gray-600">
                        As a Super Admin, you hold full access to this panel. Ensure that sensitive sponsor contact information is kept confidential and only used for official Child Education Support communications.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Heart className="text-rose-500" /> Platform Impact
                    </h4>
                    <p className="text-sm text-gray-600">
                        By maintaining up-to-date, compelling profiles of the children, you significantly increase the chances of pairing them with a willing sponsor.
                    </p>
                </div>
            </div>

        </div>
    );
}
