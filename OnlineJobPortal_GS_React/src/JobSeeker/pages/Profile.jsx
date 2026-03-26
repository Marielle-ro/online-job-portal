// import { useState } from 'react'
// import { Upload } from 'lucide-react'
// import ResumeUpload from '../components/ResumeUpload'

// function Profile() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: 'John',
//     lastName: 'Doe',
//     username: 'john.doe@example.com',
//     phone: '+1 234 567 8900',
//     skills: 'React, JavaScript, Node.js, HTML, CSS',
//     profilePicture: null,
//     resume: null
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e) => {
//     const { name, files } = e.target
//     if (files[0]) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }))
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsEditing(false)
//     // Handle form submission
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Profile</h1>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="btn-primary"
//         >
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="card">
//           <div className="flex items-center gap-6">
//             <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
//               {formData.profilePicture ? (
//                 <img
//                   src={URL.createObjectURL(formData.profilePicture)}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   <Upload size={24} />
//                 </div>
//               )}
//             </div>
//             {isEditing && (
//               <input
//                 type="file"
//                 name="profilePicture"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="text-sm"
//               />
//             )}
//           </div>
//         </div>

//         <div className="card">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Skills
//             </label>
//             <textarea
//               name="skills"
//               value={formData.skills}
//               onChange={handleInputChange}
//               disabled={!isEditing}
//               className="w-full p-2 border rounded-md"
//               rows="3"
//             />
//           </div>
//         </div>

//         <div className="card">
//           <h2 className="text-lg font-medium mb-4">Resume</h2>
//           <ResumeUpload
//             resume={formData.resume}
//             onChange={handleFileChange}
//             isEditing={isEditing}
//           />
//         </div>

//         {isEditing && (
//           <button type="submit" className="btn-primary w-full">
//             Save Changes
//           </button>
//         )}
//       </form>
//     </div>
//   )
// }

// export default Profile


//Frontend that works well

// import { useState, useEffect } from 'react'
// import { Upload } from 'lucide-react'
// import ResumeUpload from '../components/ResumeUpload'

// function Profile() {
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     phone: '',
//     skills: '',
//     profilePicture: null,
//     resume: null
//   })
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     // Retrieve userId from localStorage
//     const userId = localStorage.getItem('userId')

//     if (userId) {
//       // Fetch user data
//       fetch(`http://localhost:8089/jobseeker/getuser?userId=${userId}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch user data')
//           }
//           return response.json()
//         })
//         .then((data) => {
//           // Populate formData with retrieved data
//           setFormData((prev) => ({
//             ...prev,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             username: data.username,
//             phone: data.phoneNumber
//           }))
//           setLoading(false)
//         })
//         .catch((err) => {
//           setError(err.message)
//           setLoading(false)
//         })
//     } else {
//       setError('User ID not found in localStorage')
//       setLoading(false)
//     }
//   }, [])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e) => {
//     const { name, files } = e.target
//     if (files[0]) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }))
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsEditing(false)
//     // Handle form submission logic here
//     console.log('Updated form data:', formData)
//   }

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>
//   }

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Profile</h1>
//         <button
//           onClick={() => setIsEditing(!isEditing)}
//           className="btn-primary"
//         >
//           {isEditing ? 'Cancel' : 'Edit Profile'}
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="card">
//           <div className="flex items-center gap-6">
//             <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
//               {formData.profilePicture ? (
//                 <img
//                   src={URL.createObjectURL(formData.profilePicture)}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400">
//                   <Upload size={24} />
//                 </div>
//               )}
//             </div>
//             {isEditing && (
//               <input
//                 type="file"
//                 name="profilePicture"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="text-sm"
//               />
//             )}
//           </div>
//         </div>

//         <div className="card">
//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Username
//               </label>
//               <input
//                 type="email"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 disabled={!isEditing}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Skills
//             </label>
//             <textarea
//               name="skills"
//               value={formData.skills}
//               onChange={handleInputChange}
//               disabled={!isEditing}
//               className="w-full p-2 border rounded-md"
//               rows="3"
//             />
//           </div>
//         </div>

//         <div className="card">
//           <h2 className="text-lg font-medium mb-4">Resume</h2>
//           <ResumeUpload
//             resume={formData.resume}
//             onChange={handleFileChange}
//             isEditing={isEditing}
//           />
//         </div>

//         {isEditing && (
//           <button type="submit" className="btn-primary w-full">
//             Save Changes
//           </button>
//         )}
//       </form>
//     </div>
//   )
// }

// export default Profile


//another try

import { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import ResumeUpload from '../components/ResumeUpload'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    skills: '',
    profilePicture: null,
    resume: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId')

    if (userId) {
      // Fetch user data
      fetch(`http://localhost:8089/jobseeker/getuser?userId=${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data')
          }
          return response.json()
        })
        .then((data) => {
          // Populate formData with retrieved data
          setFormData((prev) => ({
            ...prev,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            phone: data.phoneNumber
          }))
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    } else {
      setError('User ID not found in localStorage')
      setLoading(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setIsEditing(false)
  //   // Handle form submission logic here
  //   console.log('Updated form data:', formData)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }
  
    // Prepare form data
    const formDataObj = new FormData();
    formDataObj.append('userId', userId);
    formDataObj.append('skills', formData.skills);
    if (formData.profilePicture) {
      formDataObj.append('photo', formData.profilePicture);
    }
    if (formData.resume) {
      formDataObj.append('resume', formData.resume);
    }
  
    // Send data to the backend
    fetch('http://localhost:8089/jobseeker/profile', {
      method: 'POST',
      body: formDataObj,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.text();
      })
      .then((data) => {
        console.log(data); // "Profile updated successfully"
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-primary"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              {formData.profilePicture ? (
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm"
              />
            )}
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="email"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded-md"
              rows="3"
            />
          </div>
        </div>

        {/* <div className="card">
          <h2 className="text-lg font-medium mb-4">Resume</h2>
          <ResumeUpload
            resume={formData.resume}
            onChange={handleFileChange}
            isEditing={isEditing}
          />
        </div> */}

<div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Resume (PDF)
      </label>
      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full p-2 border rounded-md"
      />
    </div>

        {isEditing && (
          <button type="submit" className="btn-primary w-full">
            Save Changes
          </button>
        )}
      </form>
    </div>
  )
}

export default Profile
