import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { getRecruiterProfile, updateRecruiterProfile } from '../api';
import { Building2, Globe, MapPin, Users, Briefcase, Mail, Phone, User, Save, Edit3, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    companyName: '',
    companyDescription: '',
    website: '',
    industry: '',
    companySize: '',
    foundedYear: '',
    headquarters: '',
    contactEmail: '',
    contactPhone: '',
    linkedinUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    mission: '',
    values: '',
    benefits: '',
    culture: ''
  });

  // Get user ID from localStorage
  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No userId found in localStorage');
      return null;
    }
    return userId;
  };

  // Fetch recruiter profile when the page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          console.error('No user ID found');
          setIsLoading(false);
          return;
        }

              const data = await getRecruiterProfile(userId);
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        username: data.username || '',
        phoneNumber: data.phoneNumber || '',
        companyName: data.companyName || '',
        companyDescription: data.companyDescription || '',
        website: data.website || '',
        industry: data.industry || '',
        companySize: data.companySize || '',
        foundedYear: data.foundedYear || '',
        headquarters: data.headquarters || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || '',
        linkedinUrl: data.linkedinUrl || '',
        twitterUrl: data.twitterUrl || '',
        facebookUrl: data.facebookUrl || '',
        mission: data.mission || '',
        values: data.values || '',
        benefits: data.benefits || '',
        culture: data.culture || ''
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setIsLoading(false);
    }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('No user ID found');
      }

      const profileData = {
        userId: userId,
        ...profile
      };

      await updateRecruiterProfile(profileData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('An error occurred while updating the profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
        <p className="mt-2 text-gray-600">
          Showcase your company to attract top talent. A complete profile helps job seekers understand your organization better.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            {!isEditing && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="bg-teal-50 text-teal-700 hover:bg-teal-100"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
            <Input
              label="Email"
              name="username"
              type="email"
              value={profile.username}
              onChange={handleInputChange}
              disabled={true}
              required
            />
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>
        </Card>

        {/* Company Information Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              name="companyName"
              value={profile.companyName}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              icon={<Building2 className="h-4 w-4" />}
            />
            <Input
              label="Industry"
              name="industry"
              value={profile.industry}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., Technology, Healthcare, Finance"
            />
            <Input
              label="Company Size"
              name="companySize"
              value={profile.companySize}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., 10-50 employees, 100-500 employees"
            />
            <Input
              label="Founded Year"
              name="foundedYear"
              value={profile.foundedYear}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., 2010"
            />
            <Input
              label="Headquarters"
              name="headquarters"
              value={profile.headquarters}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., San Francisco, CA"
              icon={<MapPin className="h-4 w-4" />}
            />
            <Input
              label="Website"
              name="website"
              type="url"
              value={profile.website}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://www.company.com"
              icon={<Globe className="h-4 w-4" />}
            />
          </div>

          <div className="mt-6">
            <Textarea
              label="Company Description"
              name="companyDescription"
              value={profile.companyDescription}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              placeholder="Describe what your company does, your mission, and what makes you unique..."
              required
            />
          </div>
        </Card>

        {/* Contact Information Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={profile.contactEmail}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="hr@company.com"
              icon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="Contact Phone"
              name="contactPhone"
              type="tel"
              value={profile.contactPhone}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="+1 (555) 123-4567"
              icon={<Phone className="h-4 w-4" />}
            />
          </div>
        </Card>

        {/* Social Media Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Social Media & Online Presence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="LinkedIn URL"
              name="linkedinUrl"
              type="url"
              value={profile.linkedinUrl}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://linkedin.com/company/company-name"
            />
            <Input
              label="Twitter URL"
              name="twitterUrl"
              type="url"
              value={profile.twitterUrl}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://twitter.com/company"
            />
            <Input
              label="Facebook URL"
              name="facebookUrl"
              type="url"
              value={profile.facebookUrl}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://facebook.com/company"
            />
          </div>
        </Card>

        {/* Company Culture Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Company Culture & Values</h2>
          </div>

          <div className="space-y-6">
            <Textarea
              label="Mission Statement"
              name="mission"
              value={profile.mission}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              placeholder="What is your company's mission? What are you trying to achieve?"
            />
            <Textarea
              label="Company Values"
              name="values"
              value={profile.values}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              placeholder="What are the core values that drive your company culture?"
            />
            <Textarea
              label="Employee Benefits"
              name="benefits"
              value={profile.benefits}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              placeholder="What benefits and perks do you offer to employees?"
            />
            <Textarea
              label="Company Culture"
              name="culture"
              value={profile.culture}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              placeholder="Describe your company culture, work environment, and what it's like to work here..."
            />
          </div>
        </Card>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </form>

      {/* Profile Preview */}
      {!isEditing && (
        <Card className="p-6 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="h-6 w-6 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-900">Profile Preview</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.companyName || 'Your Company Name'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {profile.industry || 'Industry'} • {profile.companySize || 'Company Size'}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {profile.headquarters || 'Location'} • Founded {profile.foundedYear || 'Year'}
                </p>
              </div>
            </div>
            
            {profile.companyDescription && (
              <div className="mt-4">
                <p className="text-gray-700">{profile.companyDescription}</p>
              </div>
            )}
            
            {profile.website && (
              <div className="mt-4">
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 text-sm flex items-center space-x-1"
                >
                  <Globe className="h-4 w-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}



