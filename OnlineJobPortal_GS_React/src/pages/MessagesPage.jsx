import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Dialog } from '../components/ui/Dialog';
import { Mail, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';

const initialTemplates = [
  {
    id: '1',
    name: 'Interview Invitation',
    subject: 'Interview Invitation for [Position]',
    content: `Dear [Candidate Name],

We are pleased to invite you for an interview for the [Position] role at [Company Name].

Interview Details:
Date: [Interview Date]
Time: [Interview Time]
Location: [Interview Location/Platform]

Please confirm your attendance by replying to this email.

Best regards,
[Your Name]`,
    variables: ['Candidate Name', 'Position', 'Company Name', 'Interview Date', 'Interview Time', 'Interview Location/Platform', 'Your Name'],
  },
  {
    id: '2',
    name: 'Application Rejection',
    subject: 'Update on Your Application for [Position]',
    content: `Dear [Candidate Name],

Thank you for your interest in the [Position] role at [Company Name] and for taking the time to go through our recruitment process.

After careful consideration, we regret to inform you that we have decided to move forward with other candidates whose qualifications better match our current requirements.

We appreciate your interest in joining our team and wish you success in your job search.

Best regards,
[Your Name]`,
    variables: ['Candidate Name', 'Position', 'Company Name', 'Your Name'],
  },
  {
    id: '3',
    name: 'Shortlist Notification',
    subject: 'Your Application Status for [Position]',
    content: `Dear [Candidate Name],

We are pleased to inform you that your application for the [Position] role at [Company Name] has been shortlisted.

Our team was impressed with your qualifications and experience. We will be in touch soon with more information about the next steps in our selection process.

Best regards,
[Your Name]`,
    variables: ['Candidate Name', 'Position', 'Company Name', 'Your Name'],
  },
];

export default function MessagesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: '',
  });

  const recruiterId = localStorage.getItem('userId');

  const fetchTemplate = async (status, name) => {
    try {
      const { data } = await axios.get('http://localhost:8089/recruiter/message-templates', {
        params: { recruiterId, status }
      });
      if (data && data.subject && data.content) {
        setTemplates((prev) => {
          const others = prev.filter(t => t.name !== name);
          return [...others, { id: status, name, subject: data.subject, content: data.content, variables: [] }];
        });
      }
    } catch (e) {
      // ignore missing
    }
  };

  useEffect(() => {
    if (!recruiterId) return;
    fetchTemplate('SHORTLISTED', 'Shortlist Notification');
    fetchTemplate('INTERVIEW_SCHEDULED', 'Interview Invitation');
    fetchTemplate('REJECTED', 'Application Rejection');
  }, [recruiterId]);

  const handleSave = async () => {
    if (!selectedTemplate) return;
    const statusMap = {
      'Shortlist Notification': 'SHORTLISTED',
      'Interview Invitation': 'INTERVIEW_SCHEDULED',
      'Application Rejection': 'REJECTED',
    };
    const status = statusMap[selectedTemplate.name] || selectedTemplate.id;
    await axios.post('http://localhost:8089/recruiter/message-templates', {
      recruiterId,
      status,
      subject: selectedTemplate.subject,
      content: selectedTemplate.content,
    });
    setTemplates(templates.map(t => t.id === selectedTemplate.id ? selectedTemplate : t));
    setIsEditing(false);
  };

  const handleCreate = async () => {
    const template = {
      id: String(Date.now()),
      ...newTemplate,
      variables: extractVariables(newTemplate.content),
    };
    setTemplates([...templates, template]);
    setIsCreating(false);
    setNewTemplate({ name: '', subject: '', content: '' });
  };

  const handleDelete = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId));
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
  };

  const extractVariables = (content) => {
    const matches = content.match(/\[([^\]]+)\]/g) || [];
    return matches.map(match => match.slice(1, -1));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Message Templates</h1>
          <p className="mt-1 text-gray-600">Manage your email templates for different recruitment stages.</p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-teal-600 text-white hover:bg-teal-700"
        >
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedTemplate?.id === template.id ? 'ring-2 ring-teal-500' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setIsEditing(true);
                      }}
                      className="text-gray-400 hover:text-teal-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(template.id);
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{template.subject}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="col-span-2">
          {selectedTemplate && (
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedTemplate.name}
                  </h2>
                  <p className="mt-1 text-gray-600">{selectedTemplate.subject}</p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-teal-50 text-teal-700 hover:bg-teal-100"
                >
                  {isEditing ? 'Cancel' : 'Edit Template'}
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Template Name"
                    value={selectedTemplate.name}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    label="Subject"
                    value={selectedTemplate.subject}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    label="Content"
                    value={selectedTemplate.content}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        content: e.target.value,
                      })
                    }
                    rows={12}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSave}
                      className="bg-teal-600 text-white hover:bg-teal-700"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Template Variables</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTemplate.variables.map((variable) => (
                        <span
                          key={variable}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          [{variable}]
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Content</h3>
                    <pre className="mt-2 whitespace-pre-wrap text-gray-600 font-sans">
                      {selectedTemplate.content}
                    </pre>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      <Dialog
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        title="Create New Template"
      >
        <div className="space-y-4">
          <Input
            label="Template Name"
            value={newTemplate.name}
            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            required
          />
          <Input
            label="Subject"
            value={newTemplate.subject}
            onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
            required
          />
          <Textarea
            label="Content"
            value={newTemplate.content}
            onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
            rows={8}
            required
          />
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Create Template
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}