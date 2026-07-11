import AppLayout from "@/components/layout/AppLayout";
import ProfileSettings from "@/components/settings/ProfileSettings";
import CompanySettings from "@/components/settings/CompanySettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import EmailSettings from "@/components/settings/NotificationSettings";

function SettingsPage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                        Settings
                    </h1>
                </div>
                <ProfileSettings />
                <CompanySettings />
                <SecuritySettings />
                <EmailSettings />
            </div>
        </AppLayout>
    );
}

export default SettingsPage;