'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Language = 'en' | 'es' | 'fr';
type Theme = 'system' | 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large';
type ProfileVisibility = 'public' | 'private';

interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    newsletter: boolean;
  };
  appearance: {
    theme: Theme;
    fontSize: FontSize;
  };
  privacy: {
    profileVisibility: ProfileVisibility;
    showEmail: boolean;
  };
  language: Language;
}

const SettingsPage = () => {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      newsletter: true,
    },
    appearance: {
      theme: 'system',
      fontSize: 'medium',
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
    },
    language: 'en',
  });

  const handleSettingChange = (
    category: keyof SettingsState,
    setting: string,
    value: boolean | string
  ) => {
    setSettings((prev: SettingsState) => {
      if (category === 'language') {
        return {
          ...prev,
          language: value as Language,
        };
      }
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [setting]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    // TODO: Implement settings save functionality
    // This would typically involve an API call to save user settings
    console.log('Saving settings:', settings);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Notifications Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="email-notifications" className="text-gray-300">Email Notifications</label>
            <input
              id="email-notifications"
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
              className="toggle"
              aria-label="Toggle email notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="push-notifications" className="text-gray-300">Push Notifications</label>
            <input
              id="push-notifications"
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
              className="toggle"
              aria-label="Toggle push notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="newsletter-subscription" className="text-gray-300">Newsletter Subscription</label>
            <input
              id="newsletter-subscription"
              type="checkbox"
              checked={settings.notifications.newsletter}
              onChange={(e) => handleSettingChange('notifications', 'newsletter', e.target.checked)}
              className="toggle"
              aria-label="Toggle newsletter subscription"
            />
          </div>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="theme-select" className="text-gray-300">Theme</label>
            <select
              id="theme-select"
              value={settings.appearance.theme}
              onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value as Theme)}
              className="select select-bordered w-full max-w-xs bg-gray-700"
              aria-label="Select theme"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="font-size-select" className="text-gray-300">Font Size</label>
            <select
              id="font-size-select"
              value={settings.appearance.fontSize}
              onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value as FontSize)}
              className="select select-bordered w-full max-w-xs bg-gray-700"
              aria-label="Select font size"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Privacy</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="profile-visibility" className="text-gray-300">Profile Visibility</label>
            <select
              id="profile-visibility"
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value as ProfileVisibility)}
              className="select select-bordered w-full max-w-xs bg-gray-700"
              aria-label="Select profile visibility"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="show-email" className="text-gray-300">Show Email on Profile</label>
            <input
              id="show-email"
              type="checkbox"
              checked={settings.privacy.showEmail}
              onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
              className="toggle"
              aria-label="Toggle email visibility"
            />
          </div>
        </div>
      </section>

      {/* Language Section */}
      <section className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Language</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="language-select" className="text-gray-300">Select Language</label>
          <select
            id="language-select"
            value={settings.language}
            onChange={(e) => handleSettingChange('language', '', e.target.value as Language)}
            className="select select-bordered w-full max-w-xs bg-gray-700"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </section>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Save settings"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 