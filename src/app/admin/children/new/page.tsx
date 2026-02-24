import NewChildForm from "./NewChildForm";

export default function NewChildPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Child Profile</h1>
            <NewChildForm />
        </div>
    );
}
