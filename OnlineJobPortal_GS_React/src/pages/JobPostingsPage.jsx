// import React, { useState } from 'react';
// import { Plus, Search } from 'lucide-react';
// import { Card } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Select } from '../components/ui/Select';
// import { Dialog } from '../components/ui/Dialog';
// import { Textarea } from '../components/ui/Textarea';
// import { Pagination } from '../components/ui/Pagination';

// const ITEMS_PER_PAGE = 5;

// const jobCategories = [
//   { value: 'engineering', label: 'Engineering' },
//   { value: 'design', label: 'Design' },
//   { value: 'marketing', label: 'Marketing' },
//   { value: 'sales', label: 'Sales' },
//   { value: 'customer_service', label: 'Customer Service' },
// ];

// const employmentTypes = [
//   { value: 'full_time', label: 'Full Time' },
//   { value: 'part_time', label: 'Part Time' },
//   { value: 'contract', label: 'Contract' },
//   { value: 'internship', label: 'Internship' },
// ];

// const initialJobs = [
//   {
//     id: '1',
//     title: 'Senior Frontend Developer',
//     description: 'We are looking for an experienced Frontend Developer...',
//     requirements: [
//       '5+ years React experience',
//       'Strong TypeScript skills',
//       'Experience with modern frontend tools',
//     ],
//     responsibilities: [
//       'Lead frontend development initiatives',
//       'Mentor junior developers',
//       'Architect scalable solutions',
//     ],
//     salaryRange: { min: 80000, max: 120000 },
//     location: 'Remote',
//     deadline: '2024-04-01',
//     status: 'active',
//     postedDate: '2024-03-01',
//     category: 'engineering',
//     employmentType: 'full_time',
//     experience: '5+ years',
//     benefits: [
//       'Health insurance',
//       'Remote work',
//       'Flexible hours',
//       'Professional development',
//     ],
//   },
//   // Add more sample jobs here
// ];

// export default function JobPostingsPage() {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !categoryFilter || job.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   const paginatedJobs = filteredJobs.slice(
//     currentPage * ITEMS_PER_PAGE,
//     (currentPage + 1) * ITEMS_PER_PAGE
//   );

//   const handleCreateJob = (e) => {
//     e.preventDefault();
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
//           <p className="mt-1 text-gray-600">Manage and create job postings.</p>
//         </div>
//         <Button onClick={() => setIsDialogOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           New Job Posting
//         </Button>
//       </div>

//       <Card className="p-6">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="relative col-span-2">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               className="pl-10"
//               placeholder="Search job postings..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select
//             options={jobCategories}
//             value={categoryFilter ? jobCategories.find(c => c.value === categoryFilter) : null}
//             onChange={(option) => setCategoryFilter(option?.value || null)}
//             placeholder="Filter by category"
//           />
//         </div>
//       </Card>

//       <div className="space-y-4">
//         {paginatedJobs.map((job) => (
//           <Card key={job.id} className="p-6">
//             <div className="flex justify-between items-start">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
//                   <div className="mt-2 flex gap-2">
//                     <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full">
//                       {jobCategories.find(c => c.value === job.category)?.label}
//                     </span>
//                     <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
//                       {employmentTypes.find(t => t.value === job.employmentType)?.label}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div>
//                     <span className="font-medium">Location:</span> {job.location}
//                   </div>
//                   <div>
//                     <span className="font-medium">Experience:</span> {job.experience}
//                   </div>
//                   <div>
//                     <span className="font-medium">Salary:</span> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 line-clamp-2">{job.description}</p>
//               </div>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => setSelectedJob(job)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card>
//         ))}

//         {filteredJobs.length > ITEMS_PER_PAGE && (
//           <div className="mt-6">
//             <Pagination
//               pageCount={Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>

//       <Dialog
//         isOpen={!!selectedJob}
//         onClose={() => setSelectedJob(null)}
//         title={selectedJob?.title || ''}
//       >
//         {selectedJob && (
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-medium text-gray-900">Description</h3>
//               <p className="mt-2 text-gray-600">{selectedJob.description}</p>
//             </div>
            
//             <div>
//               <h3 className="font-medium text-gray-900">Responsibilities</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
//                 {selectedJob.responsibilities.map((resp, index) => (
//                   <li key={index}>{resp}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-900">Requirements</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
//                 {selectedJob.requirements.map((req, index) => (
//                   <li key={index}>{req}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-900">Benefits</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
//                 {selectedJob.benefits.map((benefit, index) => (
//                   <li key={index}>{benefit}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="font-medium">Posted:</span>{' '}
//                 {new Date(selectedJob.postedDate).toLocaleDateString()}
//               </div>
//               <div>
//                 <span className="font-medium">Deadline:</span>{' '}
//                 {new Date(selectedJob.deadline).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         )}
//       </Dialog>

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         title="Create New Job Posting"
//       >
//         <form onSubmit={handleCreateJob} className="space-y-4">
//           <Input label="Job Title" required />
//           <Select
//             label="Category"
//             options={jobCategories}
//             onChange={() => {}}
//             placeholder="Select category"
//           />
//           <Select
//             label="Employment Type"
//             options={employmentTypes}
//             onChange={() => {}}
//             placeholder="Select employment type"
//           />
//           <Textarea label="Description" required rows={4} />
//           <div className="grid grid-cols-2 gap-4">
//             <Input label="Minimum Salary" type="number" required />
//             <Input label="Maximum Salary" type="number" required />
//           </div>
//           <Input label="Location" required />
//           <Input label="Required Experience" required />
//           <Input label="Application Deadline" type="date" required />
//           <Textarea label="Requirements (one per line)" rows={4} />
//           <Textarea label="Responsibilities (one per line)" rows={4} />
//           <Textarea label="Benefits (one per line)" rows={4} />
//           <div className="flex justify-end space-x-3">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => setIsDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="submit">Create Job Posting</Button>
//           </div>
//         </form>
//       </Dialog>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Plus, Search } from 'lucide-react';
// import axios from 'axios';  // Import Axios
// import { Card } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Select } from '../components/ui/Select';
// import { Dialog } from '../components/ui/Dialog';
// import { Textarea } from '../components/ui/Textarea';
// import { Pagination } from '../components/ui/Pagination';

// const ITEMS_PER_PAGE = 5;

// const jobCategories = [
//   { value: 'engineering', label: 'Engineering' },
//   { value: 'design', label: 'Design' },
//   { value: 'marketing', label: 'Marketing' },
//   { value: 'sales', label: 'Sales' },
//   { value: 'customer_service', label: 'Customer Service' },
// ];

// const employmentTypes = [
//   { value: 'full_time', label: 'Full Time' },
//   { value: 'part_time', label: 'Part Time' },
//   { value: 'contract', label: 'Contract' },
//   { value: 'internship', label: 'Internship' },
// ];

// const initialJobs = [
//   {
//     id: '1',
//     title: 'Senior Frontend Developer',
//     description: 'We are looking for an experienced Frontend Developer...',
//     requirements: [
//       '5+ years React experience',
//       'Strong TypeScript skills',
//       'Experience with modern frontend tools',
//     ],
//     responsibilities: [
//       'Lead frontend development initiatives',
//       'Mentor junior developers',
//       'Architect scalable solutions',
//     ],
//     salaryRange: { min: 80000, max: 120000 },
//     location: 'Remote',
//     deadline: '2024-04-01',
//     status: 'active',
//     postedDate: '2024-03-01',
//     category: 'engineering',
//     employmentType: 'full_time',
//     experience: '5+ years',
//     benefits: [
//       'Health insurance',
//       'Remote work',
//       'Flexible hours',
//       'Professional development',
//     ],
//   },
//   // Add more sample jobs here
// ];

// export default function JobPostingsPage() {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     description: '',
//     category: '',
//     employmentType: '',
//     salaryRange: { min: '', max: '' },
//     location: '',
//     experience: '',
//     postedDate: '',
//     deadline: '',
//     requirements: '',
//   });

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !categoryFilter || job.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   const paginatedJobs = filteredJobs.slice(
//     currentPage * ITEMS_PER_PAGE,
//     (currentPage + 1) * ITEMS_PER_PAGE
//   );

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob({ ...newJob, [name]: value });
//   };

//   // Submit form to save job
//   const handleCreateJob = (e) => {
//     e.preventDefault();
//     axios
//       .post('/recruiter/jobs', newJob) // Assuming your backend is running on /api/jobs
//       .then((response) => {
//         console.log(response.data);
//         setJobs([...jobs, newJob]); // Add new job to the state
//         setIsDialogOpen(false); // Close the dialog
//       })
//       .catch((error) => {
//         console.error('Error posting job:', error);
//       });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
//           <p className="mt-1 text-gray-600">Manage and create job postings.</p>
//         </div>
//         <Button onClick={() => setIsDialogOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           New Job Posting
//         </Button>
//       </div>

//       <Card className="p-6">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="relative col-span-2">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               className="pl-10"
//               placeholder="Search job postings..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select
//             options={jobCategories}
//             value={categoryFilter ? jobCategories.find(c => c.value === categoryFilter) : null}
//             onChange={(option) => setCategoryFilter(option?.value || null)}
//             placeholder="Filter by category"
//           />
//         </div>
//       </Card>

//       <div className="space-y-4">
//         {paginatedJobs.map((job) => (
//           <Card key={job.id} className="p-6">
//             <div className="flex justify-between items-start">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
//                   <div className="mt-2 flex gap-2">
//                     <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full">
//                       {jobCategories.find(c => c.value === job.category)?.label}
//                     </span>
//                     <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
//                       {employmentTypes.find(t => t.value === job.employmentType)?.label}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div>
//                     <span className="font-medium">Location:</span> {job.location}
//                   </div>
//                   <div>
//                     <span className="font-medium">Experience:</span> {job.experience}
//                   </div>
//                   <div>
//                     <span className="font-medium">Salary:</span> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 line-clamp-2">{job.description}</p>
//               </div>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => setSelectedJob(job)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card>
//         ))}

//         {filteredJobs.length > ITEMS_PER_PAGE && (
//           <div className="mt-6">
//             <Pagination
//               pageCount={Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>

//       <Dialog
//         isOpen={!!selectedJob}
//         onClose={() => setSelectedJob(null)}
//         title={selectedJob?.title || ''}
//       >
//         {selectedJob && (
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-medium text-gray-900">Description</h3>
//               <p className="mt-2 text-gray-600">{selectedJob.description}</p>
//             </div>
            
//             <div>
//               <h3 className="font-medium text-gray-900">Responsibilities</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
//                 {selectedJob.responsibilities.map((resp, index) => (
//                   <li key={index}>{resp}</li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-medium text-gray-900">Requirements</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
//                 {selectedJob.requirements.map((req, index) => (
//                   <li key={index}>{req}</li>
//                 ))}
//               </ul>
//             </div>

          

//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="font-medium">Posted:</span>{' '}
//                 {new Date(selectedJob.postedDate).toLocaleDateString()}
//               </div>
//               <div>
//                 <span className="font-medium">Deadline:</span>{' '}
//                 {new Date(selectedJob.deadline).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         )}
//       </Dialog>

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         title="Create New Job Posting"
//       >
//         <form onSubmit={handleCreateJob} className="space-y-4">
//           <Input
//             label="Job Title"
//             name="title"
//             value={newJob.title}
//             onChange={handleChange}
//             required
//           />
//           <Select
//             label="Category"
//             name="category"
//             options={jobCategories}
//             onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
//             value={newJob.category}
//             placeholder="Select category"
//           />
//           <Select
//             label="Employment Type"
//             name="employmentType"
//             options={employmentTypes}
//             onChange={(e) => setNewJob({ ...newJob, employmentType: e.target.value })}
//             value={newJob.employmentType}
//             placeholder="Select employment type"
//           />
//           <Textarea
//             label="Description"
//             name="description"
//             value={newJob.description}
//             onChange={handleChange}
//             required
//             rows={4}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               label="Minimum Salary"
//               name="salaryRange.min"
//               type="number"
//               value={newJob.salaryRange.min}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Maximum Salary"
//               name="salaryRange.max"
//               type="number"
//               value={newJob.salaryRange.max}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <Input
//             label="Location"
//             name="location"
//             value={newJob.location}
//             onChange={handleChange}
//             required
//           />
          
//           <Input
//             label="Posted Date"
//             name="posteddate"
//             type="date"
//             value={newJob.deadline}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             label="Application Deadline"
//             name="deadline"
//             type="date"
//             value={newJob.deadline}
//             onChange={handleChange}
//             required
//           />
//           <Textarea
//             label="Requirements (one per line)"
//             name="requirements"
//             value={newJob.requirements}
//             onChange={handleChange}
//             rows={4}
//           />
          
//           <Button type="submit">Create Job</Button>
//         </form>
//       </Dialog>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Plus, Search } from 'lucide-react';
// import axios from 'axios';  // Import Axios
// import { Card } from '../components/ui/Card';
// import { Button } from '../components/ui/Button';
// import { Input } from '../components/ui/Input';
// import { Select } from '../components/ui/Select';
// import { Dialog } from '../components/ui/Dialog';
// import { Textarea } from '../components/ui/Textarea';
// import { Pagination } from '../components/ui/Pagination';

// const ITEMS_PER_PAGE = 5;

// const jobCategories = [
//   { value: 'engineering', label: 'Engineering' },
//   { value: 'design', label: 'Design' },
//   { value: 'marketing', label: 'Marketing' },
//   { value: 'sales', label: 'Sales' },
//   { value: 'customer_service', label: 'Customer Service' },
// ];

// const employmentTypes = [
//   { value: 'FULL_TIME', label: 'Full Time' },
//   { value: 'PART_TIME', label: 'Part Time' },
//   { value: 'CONTRACT', label: 'Contract' },
//   { value: 'INTERNSHIP', label: 'Internship' },
// ];

// const locations = [
//   { value: 'REMOTE', label: 'Remote' },
//   { value: 'ON_SITE', label: 'On_Site' },

// ];

// const initialJobs = [
//   {
//     id: '1',
//     title: 'Senior Frontend Developer',
//     description: 'We are looking for an experienced Frontend Developer...',
//     requirements: [
//       '5+ years React experience',
//       'Strong TypeScript skills',
//       'Experience with modern frontend tools',
//     ],
//     responsibilities: [
//       'Lead frontend development initiatives',
//       'Mentor junior developers',
//       'Architect scalable solutions',
//     ],
//     salaryRange: { min: 80000, max: 120000 },
//     location: 'Remote',
//     deadline: '2024-04-01',
//     status: 'active',
//     postedDate: '2024-03-01',
//     category: 'engineering',
//     employmentType: 'full_time',
//     experience: '5+ years',
//     benefits: [
//       'Health insurance',
//       'Remote work',
//       'Flexible hours',
//       'Professional development',
//     ],
//   },
//   // Add more sample jobs here
// ];

// export default function JobPostingsPage() {
//   const [jobs, setJobs] = useState(initialJobs);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     description: '',
//     category: '',
//     employmentType: '',
//     salaryRange: { min: 0, max: 0 },
//     location: '', // Location will be handled via select
//     experience: '',
//     postedDate: '',
//     deadline: '',
//     requirements: '',
//   });

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = !categoryFilter || job.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   const paginatedJobs = filteredJobs.slice(
//     currentPage * ITEMS_PER_PAGE,
//     (currentPage + 1) * ITEMS_PER_PAGE
//   );

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob({ ...newJob, [name]: value });

//   };

  
  

//     // Handle location select change
//     const handleCategoryChange = (selectedOption) => {
//       setNewJob({ ...newJob, category: selectedOption?.value || '' });
//     };
//    // Handle location select change
//    const handleEmploymentChange = (selectedOption) => {
//     setNewJob({ ...newJob, employmentType: selectedOption?.value || '' });
//   };

//   // Handle location select change
//   const handleLocationChange = (selectedOption) => {
//     setNewJob({ ...newJob, location: selectedOption?.value || '' });
//   };

//   // Submit form to save job
//   const handleCreateJob = (e) => {
//     e.preventDefault();
//     axios
//       .post('/recruiter/jobs', newJob) // Assuming your backend is running on /api/jobs
//       .then((response) => {
//         console.log(response.data);
//         setJobs([...jobs, newJob]); // Add new job to the state
//         setIsDialogOpen(false); // Close the dialog
//       })
//       .catch((error) => {
//         console.error('Error posting job:', error);
//       });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
//           <p className="mt-1 text-gray-600">Manage and create job postings.</p>
//         </div>
//         <Button onClick={() => setIsDialogOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           New Job Posting
//         </Button>
//       </div>

//       <Card className="p-6">
//         <div className="grid grid-cols-3 gap-4">
//           <div className="relative col-span-2">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <Input
//               className="pl-10"
//               placeholder="Search job postings..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select
//             options={jobCategories}
//             value={categoryFilter ? jobCategories.find(c => c.value === categoryFilter) : null}
//             onChange={(option) => setCategoryFilter(option?.value || null)}
//             placeholder="Filter by category"
//           />
//         </div>
//       </Card>

//       <div className="space-y-4">
//         {paginatedJobs.map((job) => (
//           <Card key={job.id} className="p-6">
//             <div className="flex justify-between items-start">
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
//                   <div className="mt-2 flex gap-2">
//                     <span className="px-3 py-1 text-sm bg-teal-50 text-teal-700 rounded-full">
//                       {jobCategories.find(c => c.value === job.category)?.label}
//                     </span>
//                     <span className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full">
//                       {employmentTypes.find(t => t.value === job.employmentType)?.label}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
//                   <div>
//                     <span className="font-medium">Location:</span> {job.location}
//                   </div>
//                   <div>
//                     <span className="font-medium">Experience:</span> {job.experience}
//                   </div>
//                   <div>
//                     <span className="font-medium">Salary:</span> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
//                   </div>
//                 </div>
//                 <p className="text-gray-600 line-clamp-2">{job.description}</p>
//               </div>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => setSelectedJob(job)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card>
//         ))}

//         {filteredJobs.length > ITEMS_PER_PAGE && (
//           <div className="mt-6">
//             <Pagination
//               pageCount={Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={() => setIsDialogOpen(false)}
//         title="Create New Job Posting"
//       >
//         <form onSubmit={handleCreateJob} className="space-y-4">
//           <Input
//             label="Job Title"
//             name="title"
//             value={newJob.title}
//             onChange={handleChange}
//             required
//           />
//           <Select
//             label="Category"
//             name="category"
//             options={jobCategories}
//             value={jobCategories.find(loc => loc.value === newJob.category) || null}
//             onChange={handleCategoryChange}
//             required
         
//           />
         
//           <Select
//             label="Employment Type"
//             name="employmentType"
//             options={employmentTypes}
//             value={employmentTypes.find(loc => loc.value === newJob.employmentType) || null}
//             onChange={handleEmploymentChange}
//             required
//           />
//           <Textarea
//             label="Description"
//             name="description"
//             value={newJob.description}
//             onChange={handleChange}
//             required
//             rows={4}
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               label="Minimum Salary"
//               name="salaryRange.min"
//               type="number"
//               value={newJob.salaryRange.min}
//               onChange={handleChange}
//               required
//             />
//             <Input
//               label="Maximum Salary"
//               name="salaryRange.max"
//               type="number"
//               value={newJob.salaryRange.max}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <Select
//             label="Location"
//             name="location"
//             options={locations}
//             value={locations.find(loc => loc.value === newJob.location) || null}
//             onChange={handleLocationChange}
//             required
//           />
//           <Input
//             label="Posted Date"
//             name="posteddate"
//             type="date"
//             value={newJob.deadline}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             label="Application Deadline"
//             name="deadline"
//             type="date"
//             value={newJob.deadline}
//             onChange={handleChange}
//             required
//           />
//           <Textarea
//             label="Requirements (one per line)"
//             name="requirements"
//             value={newJob.requirements}
//             onChange={handleChange}
//             rows={4}
//           />
//           <Button type="submit">Create Job</Button>
//         </form>
//       </Dialog>
//     </div>
//   );
// }

//axiosss
import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import axios from 'axios';  // Import Axios
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Dialog } from '../components/ui/Dialog';
import { Textarea } from '../components/ui/Textarea';
import { Pagination } from '../components/ui/Pagination';
// import { postJob } from '../pages/savejobs';  // Adjust the path accordingly
import { postJob } from './savejobs';
// import { fetchCategories } from './category';


const ITEMS_PER_PAGE = 3;




const employmentTypes = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' },
];

const locations = [
  { value: 'REMOTE', label: 'Remote' },
  { value: 'ON_SITE', label: 'On_Site' },
];

// const initialJobs = [
//   {
//     id: '1',
//     title: 'Senior Frontend Developer',
//     description: 'We are looking for an experienced Frontend Developer...',
//     salaryRange: { min: 80000, max: 120000 },
//     location: 'Remote',
//     deadline: '2024-04-01',
//     status: 'active',
//     postedDate: '2024-03-01',
//     employmentType: 'full_time',
//     requirements: [
//       '5+ years React experience',
//       'Strong TypeScript skills',
//       'Experience with modern frontend tools',
//     ],
//   },
//   // Add more sample jobs here
// ];

export default function JobPostingsPage() {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]); // Start with an empty array



useEffect(() => {
  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8089/categories"); // Replace with your backend API
      const formattedCategories = response.data.map((category) => ({
        label: category.name, 
        value: category.categoryId, 
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  loadCategories();
}, []);

// fetch jobs recorded by logged in recruiter
// useEffect(() => {
//   const fetchJobsByRecruiter = async () => {
//     const recruiterId = localStorage.getItem("userId");
//     if (!recruiterId) {
//       console.error("User not logged in.");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:8089/recruiter/getjobs?recruiterId=${recruiterId}`);
//       setJobs(response.data); // Set jobs state with the data from the backend
//     } catch (error) {
//       console.error("Error fetching jobs by recruiter:", error);
//     }
//   };

//   fetchJobsByRecruiter();
// }, []); // Run once when the component mounts

// useEffect(() => {
//   const fetchJobsByRecruiter = async () => {
//     const recruiterId = localStorage.getItem("userId");
//     if (!recruiterId) {
//       console.error("User not logged in.");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:8089/recruiter/getjobs?recruiterId=${recruiterId}`);
//       // Provide default values for missing fields
//       const jobsWithDefaults = response.data.map(job => ({
//         ...job,
//         title: job.title || "Untitled Job", // Default title
//         description: job.description || "No description provided.", // Default description
//         salaryRange: {
//           min: job.salaryRange?.min || 0,
//           max: job.salaryRange?.max || 0,
//         },
//         location: job.location || "Unknown",
//       }));
//       setJobs(jobsWithDefaults);
//     } catch (error) {
//       console.error("Error fetching jobs by recruiter:", error);
//     }
//   };

//   fetchJobsByRecruiter();
// }, []);


useEffect(() => {
  const fetchJobsByRecruiter = async () => {
    const recruiterId = localStorage.getItem("userId");
    if (!recruiterId) {
      console.error("User not logged in.");
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await axios.get(`http://localhost:8089/recruiter/getjobs?recruiterId=${recruiterId}`);
      console.log("Backend response:", response.data);
      const jobsWithDefaults = response.data.map(job => ({
        ...job,
        title: job.title || "Untitled Job",
        description: job.description || "No description provided.",
        salaryRange: {
          min: job.salaryRange?.min || 0,
          max: job.salaryRange?.max || 0,
        },
        location: job.location || "Unknown",
      }));
      setJobs(jobsWithDefaults);
    } catch (error) {
      console.error("Error fetching jobs by recruiter:", error);
    }
  };

  fetchJobsByRecruiter();
}, []);




  // const [jobs, setJobs] = useState(initialJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    employmentType: '',
    salaryRange: { min: 0, max: 0 },
    location: '', // Location will be handled via select
    postedDate: '', // To be automatically set when posting the job
    applicationDeadline: '',
    requirements: '',
    recruiter: '',
    categoryId: '',
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // const filteredJobs = jobs.filter((job) => {
  //   // Ensure job and job.title are valid before filtering
  //   return job?.title?.toLowerCase().includes(searchQuery.toLowerCase());
  // });
  

  const paginatedJobs = filteredJobs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "salaryRange.min" || name === "salaryRange.max") {
      // Convert to number when updating salary range values
      setNewJob({ 
        ...newJob, 
        salaryRange: {
          ...newJob.salaryRange,
          [name.split('.')[1]]: Number(value)  // Dynamically update min or max salary
        } 
      });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };
  

  // Handle location select change
  const handleEmploymentChange = (selectedOption) => {
    setNewJob({ ...newJob, employmentType: selectedOption?.value || '' });
  };

  // Handle location select change
  const handleLocationChange = (selectedOption) => {
    setNewJob({ ...newJob, location: selectedOption?.value || '' });
  };

//   // Submit form to save job
// // Submit form to save job
const handleCreateJob = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User not logged in.");
    return;
  }

  const jobWithPostedDate = {
    ...newJob,
    postedDate: new Date().toISOString(), // Set postedDate to current date and time
    applicationDeadline: new Date(newJob.applicationDeadline).getTime(),
    recruiter: userId,
    // minSalary: newJob.salaryRange.min, // Add these lines
    // maxSalary: newJob.salaryRange.max  // Add these lines
  };

  try {
    const response = await postJob(jobWithPostedDate); // Use the postJob method
    console.log(response.data);
    setJobs([...jobs, jobWithPostedDate]); // Add new job to the state
    setIsDialogOpen(false); // Close the dialog
  } catch (error) {
    console.error('Error posting job:', error);
  }
};

// const handleCreateJob = async (e) => {
//   e.preventDefault();
//   const userId = localStorage.getItem("userId");

//   const jobWithPostedDate = {
//       title: newJob.title,
//       description: newJob.description,
//       employmentType: newJob.employmentType,
//       location: newJob.location,
//       requirements: newJob.requirements,
//       minSalary: newJob.salaryRange.min,
//       maxSalary: newJob.salaryRange.max,
//       categoryId: newJob.categoryId,
//       applicationDeadline: new Date(newJob.applicationDeadline).getTime(),
//       recruiter: userId
//   };

//   const response = await postJob(jobWithPostedDate);
//   setJobs([...jobs, response.data]);
//   setIsDialogOpen(false);
// };
// const handleCreateJob = async (e) => {
//   e.preventDefault();
//   const userId = localStorage.getItem("userId");

//   const jobWithPostedDate = {
//       title: newJob.title,
//       description: newJob.description,
//       employmentType: newJob.employmentType,
//       location: newJob.location,
//       requirements: newJob.requirements,
//       minSalary: parseFloat(newJob.salaryRange.min).toFixed(1), // Convert to double here
//       maxSalary: parseFloat(newJob.salaryRange.max).toFixed(1), // Convert to double here
//       categoryId: newJob.categoryId,
//       applicationDeadline: new Date(newJob.applicationDeadline).getTime(),
//       recruiter: userId
//   };

//   console.log('Sending job data:', jobWithPostedDate);
//   const response = await postJob(jobWithPostedDate);
//   setJobs([...jobs, response.data]);
//   setIsDialogOpen(false);
// };


const handleCategoryChange = (selectedOption) => {
  setNewJob({ ...newJob, categoryId: selectedOption?.value || '' });
};



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="mt-1 text-gray-600">Manage and create job postings.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Job Posting
        </Button>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-10"
              placeholder="Search job postings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Location:</span> {job.location}
                    </div>
                    {/* <div>
                      <span className="font-medium">Salary:</span> ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}
                    </div> */}
                    <div>
  <span className="font-medium">Salary:</span> ${job.minSalary?.toLocaleString()} - ${job.maxSalary?.toLocaleString()}
</div>

                    
                  </div>
                  <p className="text-gray-600 line-clamp-2">{job.description}</p>
                </div>
              </div>
            </Card>
           ))
        ) : (
          <p className="text-gray-600">No jobs available.</p>
        )} 

        {filteredJobs.length > ITEMS_PER_PAGE && (
          <div className="mt-6">
            <Pagination
              pageCount={Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )} 
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Create New Job Posting"
      >
        <form onSubmit={handleCreateJob} className="space-y-4">
          <Input
            label="Job Title"
            name="title"
            value={newJob.title}
            onChange={handleChange}
            required
          />

          <Select
            label="Job Category"
            name="categoryId"
            options={categories}
            value={categories.find((cat) => cat.value === newJob.categoryId) || null}
            onChange={handleCategoryChange}
            required
          />
          
          <Select
            label="Employment Type"
            name="employmentType"
            options={employmentTypes}
            value={employmentTypes.find(loc => loc.value === newJob.employmentType) || null}
            onChange={handleEmploymentChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={newJob.description}
            onChange={handleChange}
            required
            rows={4}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Salary"
              name="salaryRange.min"
              type="number"
              value={newJob.salaryRange.min}
              onChange={handleChange}
              required
            />
            <Input
              label="Maximum Salary"
              name="salaryRange.max"
              type="number"
              value={newJob.salaryRange.max}
              onChange={handleChange}
              required
            />
          </div>
          <Select
            label="Location"
            name="location"
            options={locations}
            value={locations.find(loc => loc.value === newJob.location) || null}
            onChange={handleLocationChange}
            required
          />
          <Input
            label="Application Deadline"
            name="applicationDeadline"
            type="date"
            value={newJob.deadline}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Requirements (one per line)"
            name="requirements"
            value={newJob.requirements}
            onChange={handleChange}
            rows={4}
          />
          <Button type="submit">Create Job</Button>
        </form>
      </Dialog>
    </div>
  );
}


