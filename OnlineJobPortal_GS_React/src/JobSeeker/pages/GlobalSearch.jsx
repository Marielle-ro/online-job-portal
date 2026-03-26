// // import React, { useState } from 'react';

// // const GlobalSearch = () => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [searchResults, setSearchResults] = useState({ jobs: [], recruiters: [] });

// //     const handleSearch = async () => {
// //         try {
// //             const response = await fetch(`http://localhost:8089/search/global?searchTerm=${searchTerm}`);
// //             if (!response.ok) {
// //                 throw new Error(`HTTP error! Status: ${response.status}`);
// //             }
// //             const data = await response.json();
// //             setSearchResults(data);
// //         } catch (error) {
// //             console.error('Error fetching search results:', error);
// //         }
// //     };

// //     return (
// //         <div className="search-container">
// //             <div className="flex space-x-4 items-center">
// //                 <input
// //                     type="text"
// //                     placeholder="Search for jobs, companies, etc."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     className="border p-2 rounded-md flex-grow"
// //                 />
// //                 <button
// //                     onClick={handleSearch}
// //                     className="bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
// //                 >
// //                     Search
// //                 </button>
// //             </div>

// //             {searchResults.jobs.length > 0 || searchResults.recruiters.length > 0 ? (
// //                 <div className="card mt-4">
// //                     <h2 className="text-xl font-bold mb-4">Search Results</h2>
// //                     <div>
// //                         <h3 className="text-lg font-semibold mb-2">Jobs</h3>
// //                         {searchResults.jobs.map((job) => (
// //                             <div key={job.jobId} className="border-b py-2">
// //                                 <h4 className="font-bold">{job.title}</h4>
// //                                 <p>{job.description}</p>
// //                                 <p><strong>Category:</strong> {job.category?.name || 'N/A'}</p>
// //                                 <p><strong>Requirements:</strong> {job.requirements}</p>
// //                                 <p className="text-sm text-gray-500">
// //                                     <strong>Location:</strong> {job.location} | 
// //                                     <strong> Employment Type:</strong> {job.employmentType} | 
// //                                     <strong> Salary:</strong> ${job.minSalary} - ${job.maxSalary}
// //                                 </p>
// //                             </div>
// //                         ))}
// //                     </div>

// //                     <div className="mt-4">
// //                         <h3 className="text-lg font-semibold mb-2">Recruiters</h3>
// //                         {searchResults.recruiters.map((recruiter) => (
// //                             <div key={recruiter.id} className="border-b py-2">
// //                                 <h4 className="font-bold">{recruiter.companyName}</h4>
// //                                 <p>{recruiter.companyDescription}</p>
// //                                 <a
// //                                     href={recruiter.website}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     className="text-blue-500 hover:underline text-sm"
// //                                 >
// //                                     Visit Website
// //                                 </a>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="mt-4">
// //  <h3 className="text-lg font-semibold mb-2">Location and Employment </h3>
// // {searchResults.jobs.map((job) => (
// //     <div key={job.jobId} className="border-b py-2">
// //         <strong>Location:</strong> {job.location} |
// //         <strong>Employment Type:</strong> {job.employmentType}
// //         {/* <span className="badge">{job.employmentType}</span>
// //         <span className="badge">{job.location}</span> */}
       
// //     </div>
// // ))}
// //  </div>

// //                 </div>
// //             ) : (
// //                 <p className="text-gray-500 mt-4">No search results found.</p>
// //             )}
 

// //         </div>
// //     );
// // };

// // export default GlobalSearch;

// import React, { useState } from 'react';

// const GlobalSearch = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState({ jobs: [], recruiters: [] });

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:8089/search/global?searchTerm=${searchTerm}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setSearchResults(data);
//         } catch (error) {
//             console.error('Error fetching search results:', error);
//         }
//     };

//     // Add these helper functions at the top of your component
// const getLocationBadgeColor = (location) => {
//     const colors = {
//         REMOTE: 'bg-green-100 text-green-800',
//         ONSITE: 'bg-blue-100 text-blue-800',
//         HYBRID: 'bg-purple-100 text-purple-800'
//     };
//     return colors[location] || 'bg-gray-100 text-gray-800';
// };

// const getEmploymentTypeBadgeColor = (type) => {
//     const colors = {
//         FULL_TIME: 'bg-indigo-100 text-indigo-800',
//         PART_TIME: 'bg-orange-100 text-orange-800',
//         CONTRACT: 'bg-yellow-100 text-yellow-800'
//     };
//     return colors[type] || 'bg-gray-100 text-gray-800';
// };


//     return (
//         <div className="search-container max-w-4xl mx-auto">
//             <div className="flex space-x-4 items-center mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search for jobs, companies, etc."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border p-3 rounded-lg flex-grow focus:ring-2 focus:ring-primary"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
//                 >
//                     Search
//                 </button>
//             </div>

//             {searchResults.jobs.length > 0 || searchResults.recruiters.length > 0 ? (
//                 <div className="space-y-8">
//                     {/* Jobs Section */}
//                     {searchResults.jobs.length > 0 && (
//                         <div className="bg-white rounded-lg shadow-md p-6">
//                             <h2 className="text-2xl font-bold mb-4">Jobs</h2>
//                             <div className="space-y-6">
//                                 {searchResults.jobs.map((job) => (
//                                     <div key={job.jobId} className="border-b pb-4">
//                                         <div className="flex justify-between items-start mb-2">
//                                             <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
//                                             <div className="flex gap-2">
//                                                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                                     {job.employmentType}
//                                                 </span>
//                                                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                                                     {job.location}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <p className="text-gray-600 mb-2">{job.description}</p>
//                                         <div className="grid grid-cols-2 gap-4 text-sm">
//                                             <div>
//                                                 <strong className="text-gray-700">Requirements:</strong>
//                                                 <p>{job.requirements}</p>
//                                             </div>
//                                             <div>
//                                                 <strong className="text-gray-700">Salary Range:</strong>
//                                                 <p>${job.minSalary} - ${job.maxSalary}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Recruiters Section */}
//                     {searchResults.recruiters.length > 0 && (
//                         <div className="bg-white rounded-lg shadow-md p-6">
//                             <h2 className="text-2xl font-bold mb-4">Companies</h2>
//                             <div className="grid gap-6">
//                                 {searchResults.recruiters.map((recruiter) => (
//                                     <div key={recruiter.id} className="border-b pb-4">
//                                         <h3 className="text-xl font-semibold mb-2">{recruiter.companyName}</h3>
//                                         <p className="text-gray-600 mb-3">{recruiter.companyDescription}</p>
//                                         <a
//                                             href={recruiter.website}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="inline-flex items-center text-primary hover:text-primary-dark"
//                                         >
//                                             Visit Website →
//                                         </a>
//                                     </div>
//                                 ))}
//                             </div>

//                         </div>
//                     )}
// {searchResults.jobs.map((job) => (
//     <div key={job.jobId} className="border-b py-4">
//         <div className="flex justify-between items-start mb-3">
//             <h4 className="font-bold text-lg">{job.title}</h4>
//             <div className="flex gap-2">
//                 <span className={`px-3 py-1 rounded-full text-sm ${getLocationBadgeColor(job.location)}`}>
//                     {job.location}
//                 </span>
//                 <span className={`px-3 py-1 rounded-full text-sm ${getEmploymentTypeBadgeColor(job.employmentType)}`}>
//                     {job.employmentType}
//                 </span>
//             </div>
//         </div>
//         {/* Rest of your job card content */}
//     </div>
// ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500">No search results found.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GlobalSearch;

//typoo
// import React, { useState } from 'react';

// const GlobalSearch = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState({ jobs: [], recruiters: [] });

//     const getLocationBadgeColor = (location) => ({
//         REMOTE: 'bg-green-100 text-green-800',
//         ONSITE: 'bg-blue-100 text-blue-800',
//         HYBRID: 'bg-purple-100 text-purple-800'
//     }[location] || 'bg-gray-100 text-gray-800');

//     const getEmploymentTypeBadgeColor = (type) => ({
//         FULL_TIME: 'bg-indigo-100 text-indigo-800',
//         PART_TIME: 'bg-orange-100 text-orange-800',
//         CONTRACT: 'bg-yellow-100 text-yellow-800'
//     }[type] || 'bg-gray-100 text-gray-800');

//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`http://localhost:8089/search/global?searchTerm=${searchTerm}`);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//             const data = await response.json();
//             setSearchResults(data);
//         } catch (error) {
//             console.error('Error fetching search results:', error);
//         }
//     };

//     const renderJobCard = (job) => (
//         <div key={job.jobId} className="border-b pb-4">
//             <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
//                 <div className="flex gap-2">
//                     <span className={`px-3 py-1 rounded-full text-sm ${getEmploymentTypeBadgeColor(job.employmentType)}`}>
//                         {job.employmentType}
//                     </span>
//                     <span className={`px-3 py-1 rounded-full text-sm ${getLocationBadgeColor(job.location)}`}>
//                         {job.location}
//                     </span>
//                 </div>
//             </div>
//             <p className="text-gray-600 mb-2">{job.description}</p>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                     <strong className="text-gray-700">Requirements:</strong>
//                     <p>{job.requirements}</p>
//                 </div>
//                 <div>
//                     <strong className="text-gray-700">Salary Range:</strong>
//                     <p>${job.minSalary} - ${job.maxSalary}</p>
//                 </div>
//             </div>
//         </div>
//     );

//     const renderRecruiterCard = (recruiter) => (
//         <div key={recruiter.id} className="border-b pb-4">
//             <h3 className="text-xl font-semibold mb-2">{recruiter.companyName}</h3>
//             <p className="text-gray-600 mb-3">{recruiter.companyDescription}</p>
//             <a
//                 href={recruiter.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center text-primary hover:text-primary-dark"
//             >
//                 Visit Website →
//             </a>
//         </div>
//     );

//     return (
//         <div className="search-container max-w-4xl mx-auto">
//             <div className="flex space-x-4 items-center mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search for jobs, companies, etc."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border p-3 rounded-lg flex-grow focus:ring-2 focus:ring-primary"
//                 />
//                 <button
//                     onClick={handleSearch}
//                     className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
//                 >
//                     Search
//                 </button>
//             </div>

//             {searchResults.jobs.length > 0 || searchResults.recruiters.length > 0 ? (
//                 <div className="space-y-8">
//                     {searchResults.jobs.length > 0 && (
//                         <div className="bg-white rounded-lg shadow-md p-6">
//                             <h2 className="text-2xl font-bold mb-4">Jobs</h2>
//                             <div className="space-y-6">
//                                 {searchResults.jobs.map(renderJobCard)}
//                             </div>
//                         </div>
//                     )}

//                     {searchResults.recruiters.length > 0 && (
//                         <div className="bg-white rounded-lg shadow-md p-6">
//                             <h2 className="text-2xl font-bold mb-4">Companies</h2>
//                             <div className="grid gap-6">
//                                 {searchResults.recruiters.map(renderRecruiterCard)}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="text-center py-8">
//                     <p className="text-gray-500">No search results found.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default GlobalSearch;

//turakoraa
import React, { useState } from 'react';

const GlobalSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ jobs: [], recruiters: [] });

    const getLocationBadgeColor = (location) => ({
        REMOTE: 'bg-green-100 text-green-800',
        ONSITE: 'bg-blue-100 text-blue-800',
        HYBRID: 'bg-purple-100 text-purple-800'
    }[location] || 'bg-gray-100 text-gray-800');

    const getEmploymentTypeBadgeColor = (type) => ({
        FULL_TIME: 'bg-indigo-100 text-indigo-800',
        PART_TIME: 'bg-orange-100 text-orange-800',
        CONTRACT: 'bg-yellow-100 text-yellow-800'
    }[type] || 'bg-gray-100 text-gray-800');

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8089/search/global?searchTerm=${searchTerm}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const renderJobCard = (job) => (
        <div key={job.jobId} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
                <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getEmploymentTypeBadgeColor(job.employmentType)}`}>
                        {job.employmentType}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getLocationBadgeColor(job.location)}`}>
                        {job.location}
                    </span>
                </div>
            </div>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <strong className="text-gray-700">Requirements:</strong>
                    <p>{job.requirements}</p>
                </div>
                <div>
                    <strong className="text-gray-700">Salary Range:</strong>
                    <p>${job.minSalary?.toLocaleString()} - ${job.maxSalary?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );

    const renderRecruiterCard = (recruiter) => (
        <div key={recruiter.id} className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">{recruiter.companyName}</h3>
            <p className="text-gray-600 mb-3">{recruiter.companyDescription}</p>
            <a
                href={recruiter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-dark"
            >
                Visit Website →
            </a>
        </div>
    );

    return (
        <div className="search-container max-w-4xl mx-auto">
            <div className="flex space-x-4 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search for jobs, companies, etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-3 rounded-lg flex-grow focus:ring-2 focus:ring-primary"
                />
                <button
                    onClick={handleSearch}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Search
                </button>
            </div>

            {searchResults.jobs.length > 0 || searchResults.recruiters.length > 0 ? (
                <div className="space-y-8">
                    {searchResults.jobs.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Jobs</h2>
                            <div className="space-y-6">
                                {searchResults.jobs.map(renderJobCard)}
                            </div>
                        </div>
                    )}

                    {searchResults.recruiters.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Companies</h2>
                            <div className="grid gap-6">
                                {searchResults.recruiters.map(renderRecruiterCard)}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-center space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">No Results Found</h3>
                        <p className="text-gray-500">Try adjusting your search terms or filters</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;


