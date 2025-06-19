'use client'

import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // To be replaced by apiClient
import apiClient from '../../lib/apiClient'; // Import apiClient
import { useUser, UserProfile as GlobalUserProfile } from '../../contexts/UserContext'; // Adjusted import path

// --- Icon Components (can be moved to a separate file later) ---
const UserCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LockClosedIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const XMarkIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
// --- End Icon Components ---


// --- Reusable Modal Component (Simplified) ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
// --- End Modal Component ---

// --- Settings Page Component ---
interface AppSettings { // Renamed from UserSettings to avoid confusion with user profile data
  lowBalanceNotifications: boolean;
  allowedProviders: string[];
  ignoredProviders: string[];
  defaultProviderSort: 'balanced' | 'cost' | 'speed';
  defaultModel: string;
  organizationName?: string; // Simplified organization info for now
}

// Using GlobalUserProfile from context now, so local UserProfile can be removed or aliased if still needed for clarity
// interface UserProfile { // This can be removed if GlobalUserProfile from context is used directly
//     id: number;
//     email: string;
//     displayName: string | null;
//     avatarUrl: string | null;
// }

// Placeholder data - this would come from an API call
const availableProviders = ['OpenAI', 'Anthropic', 'Google', 'Mistral', 'Groq', 'NeuroSwitch'];
// const availableModels = ['gpt-4-turbo', 'claude-3-opus', 'gemini-pro', 'mistral-large', 'llama3-70b', 'NeuroSwitch Classifier']; // Old specific models

const defaultModelOptions = [
    { value: 'neuroswitch', label: 'NeuroSwitch' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
];

// const API_BASE_URL = '/api'; // Define once // Handled by apiClient
// const getAuthToken = () => { // Handled by apiClient
//     if (typeof window !== 'undefined') {
//         return localStorage.getItem('auth_token');
//     }
//     return null;
// }

export default function SettingsPage() {
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  // const [userProfile, setUserProfile] = useState<GlobalUserProfile | null>(null); // Will use global user from context
  const { user: globalUser, isLoadingUser: isLoadingGlobalUser, fetchUserProfile: refreshGlobalUser } = useUser();

  const [isLoadingPageData, setIsLoadingPageData] = useState(true); // For initial page data loading
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountModalTab, setAccountModalTab] = useState<'profile' | 'security'>('profile');
  const [editableDisplayName, setEditableDisplayName] = useState('');
  
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // State for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);

  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [orgLogo, setOrgLogo] = useState<File | null>(null);

  useEffect(() => {
    if (isAccountModalOpen || isOrgModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAccountModalOpen, isOrgModalOpen]);

  // Effect to initialize editableDisplayName when globalUser data is available
  useEffect(() => {
    if (globalUser) {
      setEditableDisplayName(globalUser.displayName || '');
    }
  }, [globalUser]);

  useEffect(() => {
    const fetchPageSpecificData = async () => {
        setIsLoadingPageData(true);
        setError(null);
        
        let userDefaultModel = 'neuroswitch'; // Default value
        if (typeof window !== 'undefined') {
            const savedDefaultModel = localStorage.getItem('userDefaultModel');
            if (savedDefaultModel && defaultModelOptions.some(opt => opt.value === savedDefaultModel)) {
                userDefaultModel = savedDefaultModel;
            }
        }

        // Fetch app settings (mocked for now, replace with actual API call)
        const mockAppSettings: AppSettings = {
            lowBalanceNotifications: true,
            allowedProviders: ['OpenAI'],
            ignoredProviders: [],
            defaultProviderSort: 'balanced',
            defaultModel: userDefaultModel, // Use loaded or default value
            organizationName: undefined
        };
        setAppSettings(mockAppSettings);
        // User profile data is now primarily from global context.
        // If there was other page-specific data, fetch it here.
        setIsLoadingPageData(false);
    };

    fetchPageSpecificData();
    // The global UserProvider already fetches user profile on mount.
    // If token is not found by UserProvider, globalUser will be null.
    // We can check globalUser and isLoadingGlobalUser for page behavior.

    // const token = getAuthToken(); // Handled by apiClient
    // if (!token && !isLoadingGlobalUser) { // If no token and global user loading is done
    //     setError("Authentication token not found. Please log in.");
    //     setIsLoadingPageData(false); // Ensure page loading state is also false
    // }

  }, [isLoadingGlobalUser]); // Rerun if global user loading state changes

  const handleAppSettingChange = (key: keyof AppSettings, value: any) => {
    setAppSettings(prev => {
        const newSettings = prev ? { ...prev, [key]: value } : null;
        if (key === 'defaultModel' && typeof window !== 'undefined') {
            localStorage.setItem('userDefaultModel', value);
        }
        return newSettings;
    });
    console.log('App Setting changed:', key, value);
    setSuccessMessage('App setting updated locally. API save pending.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (file.size > 5 * 1024 * 1024) { 
            setError("Image file is too large. Maximum size is 5MB.");
            return;
        }
        if (!file.type.startsWith('image/')) {
            setError("Invalid file type. Please select an image.");
            return;
        }
        setSelectedAvatarFile(file);
        setAvatarPreviewUrl(URL.createObjectURL(file));
        setError(null); 
    } else {
        setSelectedAvatarFile(null);
        setAvatarPreviewUrl(null);
    }
  };

  const handleSaveProfile = async () => {
    if (!globalUser) { // Check globalUser from context
        setError("User profile not loaded. Cannot save changes.");
        // Clear password fields and messages if profile save is attempted from profile tab
        // Though ideally, save profile and change password are two distinct actions
        if (accountModalTab === 'profile') { 
            setPasswordChangeError(null);
            setPasswordChangeSuccess(null);
        }
        return;
    }
    // const token = getAuthToken(); // Handled by apiClient
    setSuccessMessage(null);
    setError(null);

    let profileUpdated = false;
    let newAvatarUrl = globalUser.avatarUrl; // Start with current avatar from global context

    if (selectedAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', selectedAvatarFile);
        try {
            // The backend response UserProfile should match GlobalUserProfile
            // const avatarResponse = await axios.post<{ message: string; user: GlobalUserProfile }>( // Old call
            //     `${API_BASE_URL}/profile/avatar`,
            //     formData,
            //     { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            // );
            const avatarResponse = await apiClient.post<{ message: string; user: GlobalUserProfile }>( // New call
                '/profile/avatar', // Path relative to apiClient's base URL
                formData
                // apiClient handles token; axios handles FormData Content-Type
            );
            newAvatarUrl = avatarResponse.data.user.avatarUrl;
            profileUpdated = true;
            // Temporary success message, will be overwritten by final one or if only avatar changed.
            // setSuccessMessage(avatarResponse.data.message || 'Avatar updated successfully!');
            setSelectedAvatarFile(null); 
            setAvatarPreviewUrl(null);
        } catch (err) {
            console.error("Failed to upload avatar:", err);
            const axiosError = err as any;
            setError(axiosError.response?.data?.error || 'Failed to upload avatar.');
            return; 
        }
    }

    if (editableDisplayName !== globalUser.displayName || profileUpdated) {
        try {
            // Backend response UserProfile should match GlobalUserProfile
            // await axios.put<{ message: string; user: GlobalUserProfile }>( // Old call
            //     `${API_BASE_URL}/profile`, 
            //     { displayName: editableDisplayName }, 
            //     { headers: { Authorization: `Bearer ${token}` } }
            // );
            await apiClient.put<{ message: string; user: GlobalUserProfile }>( // New call
                '/profile', 
                { displayName: editableDisplayName }
                // apiClient handles token
            );
            // No need to set local userProfile state here. The global refresh will handle it.
            profileUpdated = true;
        } catch (err) {
            console.error("Failed to update display name:", err);
            const axiosError = err as any;
            setError(axiosError.response?.data?.error || 'Failed to update display name.');
            return; 
        }
    }

    if (profileUpdated) {
        try {
            await refreshGlobalUser(); // Refresh the global user state!
            setSuccessMessage('Profile updated successfully!'); 
            // Clear password success/error if profile update was successful
            setPasswordChangeError(null);
            setPasswordChangeSuccess(null);
        } catch (e) {
            console.error("Error refreshing global user profile:", e);
            setError('Profile updated, but failed to refresh display. Please reload.');
        }
        setTimeout(() => setSuccessMessage(null), 3000);
        // setIsAccountModalOpen(false); // Optionally close modal
    } else {
        setSuccessMessage("No changes to save.");
        setTimeout(() => setSuccessMessage(null), 3000);
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (file.size > 10 * 1024 * 1024) { 
            alert("File is too large. Maximum size is 10MB.");
            return;
        }
        setOrgLogo(file);
    }
  };

  const handleCreateOrganization = () => {
    console.log('Creating organization:', orgName, orgLogo);
    setIsOrgModalOpen(false);
  };

  // Logic for changing password
  const handleChangePassword = async () => {
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);
    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }
    if (!currentPassword || !newPassword) {
      setPasswordChangeError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) { // Example: Basic password length validation
        setPasswordChangeError("New password must be at least 8 characters long.");
        return;
    }

    // const token = getAuthToken(); // Handled by apiClient
    // if (!token) { // Handled by apiClient
    //   setPasswordChangeError("Authentication token not found. Please log in again.");
    //   return;
    // }

    try {
      interface ChangePasswordSuccessResponse {
        message: string;
      }
      // const passwordChangeResponse = await axios.put<ChangePasswordSuccessResponse>( // Old call
      //   `${API_BASE_URL}/profile/change-password`,
      //   { currentPassword, newPassword },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      const passwordChangeResponse = await apiClient.put<ChangePasswordSuccessResponse>( // New call
        '/profile/change-password',
        { currentPassword, newPassword }
        // apiClient handles token
      );
      setPasswordChangeSuccess(passwordChangeResponse.data.message || "Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordChangeSuccess(null), 4000);
    } catch (err: any) {
      console.error("Failed to change password:", err);
      const errorMsg = err.response?.data?.error || "Failed to change password. Please try again.";
      setPasswordChangeError(errorMsg);
    }
  };

  // Combined loading state for initial data (app settings + global user check)
  if (isLoadingPageData || isLoadingGlobalUser) {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
             <header className="mb-8 max-w-3xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-gray-900 animate-pulse bg-gray-300 h-10 w-1/3 rounded"></h1>
            </header>
            {[1,2,3].map(i => (
                <section key={i} className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded w-1/4"></div>
                </section>
            ))}
        </div>
    );
  }

  // ... (renderMessages function as before) ...
  const renderMessages = () => (
    <div className="max-w-3xl mx-auto w-full fixed top-5 left-1/2 transform -translate-x-1/2 z-[100] px-4">
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 shadow-md rounded" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.414 10l2.829-2.828a1 1 0 1 0-1.414-1.414L10 8.586 7.172 5.757a1 1 0 0 0-1.414 1.414L8.586 10l-2.828 2.828a1 1 0 1 0 1.414 1.414L10 11.414l2.828 2.829a1 1 0 0 0 1.414-1.414L11.414 10z"/></svg></div>
                    <div>
                        <p className="font-bold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        )}
        {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 shadow-md rounded" role="alert">
                 <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42z"/></svg></div>
                    <div>
                        <p className="font-bold">Success</p>
                        <p className="text-sm">{successMessage}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  // Check if critical data (app settings or user profile) is missing after loading attempts
  if (!appSettings || (!globalUser && !isLoadingGlobalUser && typeof window !== 'undefined' && !localStorage.getItem('auth_token'))) {
    return (
        <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
            {renderMessages()} {/* Show errors like "Token not found" */}
            <header className="mb-8 max-w-3xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </header>
            <p className="text-center text-gray-600">
                {error ? error : "Critical settings data could not be loaded. Please try refreshing the page."}
            </p>
        </div>
    );
  }
  
  // If there's no token, and not loading, globalUser will be null. Let UserProvider handle auth wall / redirects
  // This page might still render briefly or show an error if token is missing, which is okay.
  // The main check is for `appSettings` and ensuring `globalUser` is used for profile info.

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-screen">
      {renderMessages()}
      <header className="mb-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </header>

      {/* Account Section */}
      <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Account</h2>
        <p className="text-sm text-gray-600 mb-4">Manage your login credentials, security settings, or delete your account.</p>
        <button 
          onClick={() => {
            if (globalUser) setEditableDisplayName(globalUser.displayName || '');
            setAccountModalTab('profile');
            setSelectedAvatarFile(null); 
            setAvatarPreviewUrl(null);
            setIsAccountModalOpen(true);
          }}
          disabled={!globalUser || isLoadingGlobalUser} // Disable if no user or loading
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50"
        >
          Manage Account
        </button>
      </section>

      {/* Organization Section (ensure appSettings is loaded) */}
      {appSettings && (
          <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Organization</h2>
            <p className="text-sm text-gray-600 mb-4">
            {appSettings.organizationName ? `Manage your organization: ${appSettings.organizationName}` : 'Create and manage your organization.'}
            </p>
            <button 
            onClick={() => setIsOrgModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm"
            >
            {appSettings.organizationName ? 'Manage Organization' : 'Create Organization'}
            </button>
        </section>
      )}
      
      {/* Low Balance Notifications (ensure appSettings & globalUser for email are loaded) */}
      {appSettings && globalUser && (
        <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Low Balance Notifications</h2>
            <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Alert notifications will be sent to <span className="font-medium">{globalUser.email}</span>.</p>
            <label htmlFor="lowBalanceToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                <input 
                    type="checkbox" 
                    id="lowBalanceToggle" 
                    className="sr-only" 
                    checked={appSettings.lowBalanceNotifications}
                    onChange={(e) => handleAppSettingChange('lowBalanceNotifications', e.target.checked)}
                />
                <div 
                    className={`block w-14 h-8 rounded-full transition-colors ${appSettings.lowBalanceNotifications ? 'bg-green-500' : 'bg-gray-300'}`}
                ></div>
                <div 
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${appSettings.lowBalanceNotifications ? 'translate-x-6' : ''}`}
                ></div>
                </div>
            </label>
            </div>
        </section>
      )}

      {/* Other settings sections (ensure appSettings is loaded) */}
      {appSettings && (
        <>
            <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Allowed Providers</h2>
                <p className="text-sm text-gray-600 mb-4">Select the providers you want to exclusively use for your requests. When set, only these providers will be used.</p>
                <select 
                    onChange={(e) => {
                        const provider = e.target.value;
                        if (provider && appSettings && !appSettings.allowedProviders.includes(provider)) {
                            handleAppSettingChange('allowedProviders', [...appSettings.allowedProviders, provider]);
                        }
                    }}
                    value=""
                    className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="" disabled>Select a provider to allow</option>
                    {availableProviders.filter(p => !appSettings.allowedProviders.includes(p)).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <div className="mt-2 text-sm text-gray-500">
                    {appSettings.allowedProviders.length > 0 
                        ? (
                            <ul className="list-disc list-inside">
                                {appSettings.allowedProviders.map(p => (
                                    <li key={p} className="flex items-center justify-between py-1">
                                        {p}
                                        <button 
                                            onClick={() => handleAppSettingChange('allowedProviders', appSettings.allowedProviders.filter(item => item !== p))}
                                            className="ml-2 text-red-500 hover:text-red-700 text-xs p-1 bg-red-100 rounded"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )
                        : 'No providers are specifically allowed. All non-ignored providers are used.'}
                </div>
            </section>

            <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Ignored Providers</h2>
                <p className="text-sm text-gray-600 mb-4">Select the providers you want to exclude from serving your requests.</p>
                <select 
                    onChange={(e) => {
                        const provider = e.target.value;
                        if (provider && appSettings && !appSettings.ignoredProviders.includes(provider)) {
                            handleAppSettingChange('ignoredProviders', [...appSettings.ignoredProviders, provider]);
                        }
                    }}
                    value=""
                    className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="" disabled>Select a provider to ignore</option>
                    {availableProviders.filter(p => !appSettings.ignoredProviders.includes(p)).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <div className="mt-2 text-sm text-gray-500">
                    {appSettings.ignoredProviders.length > 0 
                        ? (
                            <ul className="list-disc list-inside">
                                {appSettings.ignoredProviders.map(p => (
                                    <li key={p} className="flex items-center justify-between py-1">
                                        {p}
                                        <button 
                                            onClick={() => handleAppSettingChange('ignoredProviders', appSettings.ignoredProviders.filter(item => item !== p))}
                                            className="ml-2 text-red-500 hover:text-red-700 text-xs p-1 bg-red-100 rounded"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )
                        : 'No providers are ignored.'}
                </div>
            </section>

            <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Default Provider Sort</h2>
                <p className="text-sm text-gray-600 mb-4">Choose how providers should be sorted. Individual requests may still override this setting.</p>
                <select 
                    value={appSettings.defaultProviderSort}
                    onChange={(e) => handleAppSettingChange('defaultProviderSort', e.target.value as AppSettings['defaultProviderSort'])}
                    className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                <option value="balanced">Default (balanced)</option>
                <option value="cost">Cost-first</option>
                <option value="speed">Speed-first</option>
                </select>
                <p className="text-xs text-blue-600 hover:underline mt-2 cursor-pointer">Learn more in the Provider Routing docs.</p>
            </section>

            <section className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">Default Model</h2>
                <p className="text-sm text-gray-600 mb-4">Apps will use this model by default, but they may override it if they choose to do so. This model will also be used as your default fallback model.</p>
                <select 
                    value={appSettings.defaultModel}
                    onChange={(e) => handleAppSettingChange('defaultModel', e.target.value)}
                    className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                {defaultModelOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <p className="text-xs text-blue-600 hover:underline mt-2 cursor-pointer">Click here to browse available models and prices.</p>
            </section>
        </>
      )}

      {/* Manage Account Modal (ensure globalUser is loaded before allowing interaction) */}
      {globalUser && (
        <Modal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} title="Manage your account">
            <input 
                type="file"
                ref={avatarInputRef}
                onChange={handleAvatarFileChange}
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
            />
            <div className="flex border-b mb-6 pb-2">
                <button 
                    className={`px-4 py-2 text-sm font-medium ${accountModalTab === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setAccountModalTab('profile')}
                >
                    <UserCircleIcon className="inline w-5 h-5 mr-1"/> Profile
                </button>
                <button 
                    className={`px-4 py-2 text-sm font-medium ${accountModalTab === 'security' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setAccountModalTab('security')}
                >
                    <LockClosedIcon className="inline w-5 h-5 mr-1"/> Security
                </button>
            </div>
            {accountModalTab === 'profile' && (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                            src={avatarPreviewUrl || (globalUser.avatarUrl || undefined)} 
                            alt="User Avatar" 
                            className={`w-full h-full object-cover ${(avatarPreviewUrl || globalUser.avatarUrl) ? '' : 'hidden'}`}
                        />
                        {!(avatarPreviewUrl || globalUser.avatarUrl) && (
                            <UserCircleIcon className="w-12 h-12 text-gray-400"/>
                        )}
                    </div>
                    <div>
                        <button 
                            onClick={() => avatarInputRef.current?.click()}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Update profile picture
                        </button>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input 
                        type="text" 
                        id="displayName" 
                        value={editableDisplayName} // Initialized from globalUser.displayName
                        onChange={(e) => setEditableDisplayName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Your Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email address</label>
                    <div className="flex justify-between items-center p-2 border rounded-md mt-1 bg-gray-50">
                        <span className="text-gray-700">{globalUser.email}</span> 
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Primary</span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Connected accounts</label>
                    <button className="mt-1 text-sm text-blue-600 hover:underline">+ Connect Google</button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Web3 wallets</label>
                    <button className="mt-1 text-sm text-blue-600 hover:underline">+ Connect Wallet</button>
                </div>
                <div className="flex justify-end pt-4 border-t mt-6">
                    <button 
                        type="button"
                        onClick={() => {
                            setIsAccountModalOpen(false);
                            setAvatarPreviewUrl(null); 
                            setSelectedAvatarFile(null);
                            setError(null); 
                            if (globalUser) setEditableDisplayName(globalUser.displayName || ''); // Reset to global state on cancel
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm mr-3"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={handleSaveProfile}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                    >
                        Save Profile Changes
                    </button>
                </div>
            </div>
            )}
            {accountModalTab === 'security' && (
            <div className="space-y-6">
                <div>
                    <h3 className="text-md font-semibold mb-2">Password</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input 
                                type="password"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input 
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                autoComplete="new-password"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input 
                                type="password"
                                id="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                autoComplete="new-password"
                            />
                        </div>
                        {passwordChangeError && <p className="text-sm text-red-600">{passwordChangeError}</p>}
                        {passwordChangeSuccess && <p className="text-sm text-green-600">{passwordChangeSuccess}</p>}
                        <button 
                            type="button"
                            onClick={handleChangePassword}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="pt-6 border-t">
                    <h3 className="text-md font-semibold mb-1">Two-factor authentication</h3>
                    <p className="text-sm text-gray-600 mb-2">Protect your account with an extra layer of security.</p>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Enable 2FA</button>
                </div>
                <div className="flex justify-end pt-4 border-t mt-6">
                    <button 
                        type="button"
                        onClick={() => setIsAccountModalOpen(false)} 
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm"
                    >
                        Done
                    </button>
                </div>
            </div>
            )}
        </Modal>
      )}
      
      {/* Create/Manage Organization Modal (ensure appSettings is loaded) */}
      {appSettings && (
        <Modal isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)} title={appSettings.organizationName ? "Manage Organization" : "Create Organization"}>
            {appSettings.organizationName ? (
                <div className="space-y-4">
                    <p>Current Organization Name: <span className="font-semibold">{appSettings.organizationName}</span></p>
                    <label htmlFor="newOrgName" className="block text-sm font-medium text-gray-700">New Organization Name (optional)</label>
                    <input 
                        type="text" 
                        id="newOrgName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Update Company Inc."
                    />
                    <div className="flex justify-end pt-4 border-t">
                        <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 rounded-lg shadow-sm mr-auto">Delete Organization</button>
                        <button 
                            onClick={() => setIsOrgModalOpen(false)} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm mr-3"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreateOrganization}
                            disabled={!orgName.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm disabled:opacity-50"
                        >
                            Create Organization
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
                        <input 
                            type="text" 
                            id="orgName"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Your Company Inc."
                        />
                    </div>
                    <div>
                        <label htmlFor="orgLogo" className="block text-sm font-medium text-gray-700">Organization Logo (1:1 aspect ratio, max 10MB)</label>
                        <input 
                            type="file" 
                            id="orgLogo"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleFileUpload}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {orgLogo && <p className="text-xs mt-1">Selected: {orgLogo.name}</p>}
                    </div>
                    <div className="flex justify-end pt-4 border-t">
                        <button 
                            onClick={() => setIsOrgModalOpen(false)} 
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm mr-3"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCreateOrganization}
                            disabled={!orgName.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm disabled:opacity-50"
                        >
                            Create Organization
                        </button>
                    </div>
                </div>
            )}
        </Modal>
      )}

    </div>
  );
} 