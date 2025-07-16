import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';


function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    class: '',
    section: '',
    phone: '',
    school: '',
    otherSchoolName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const showOtherSchool = form.school === 'Other';

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const data = {
      ...form,
      school: form.school === 'Other' ? form.otherSchoolName : form.school
    };

    try {
      const res = await axios.post('https://registration-page-v3.onrender.com/register', data);
      setMessage(res.data || 'Submitted successfully');
    }catch (err) {
        setMessage('Submission failed');
      }
      finally{
        setLoading(false);
      setForm({
        name: '',
        class: '',
        section: '',
        phone: '',
        school: '',
        otherSchoolName: ''
      });
    } 
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="form-container">
            <div className="logos">
            <img src="/images/logo1.png" alt="Logo" className="logo1"/>
            <img src="/images/logo2.png" alt="Logo" className="logo2"/>
            </div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Student Name" value={form.name.toUpperCase()} onChange={handleChange} required />
        <input name="class" placeholder="Class" value={form.class.toUpperCase()} onChange={handleChange} required />
        <input name="section" placeholder="Section" value={form.section.toUpperCase()} onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />

        <select name="school" value={form.school} onChange={handleChange} required>
          <option value="">-- Select School --</option>
          <option value="MBA">MBA</option>
          <option value="SDIS">SDIS</option>
          <option value="Other">Other</option>
        </select>

        {showOtherSchool && (
          <input name="otherSchoolName" placeholder="Other School Name" value={form.otherSchoolName} onChange={handleChange} required />
        )}

        <button type="submit">Submit</button>
        </form>

        {loading ? (
  <div className="spinner"></div>
    ) : 
    (
        message &&( 
    <div className='msg' >{message}</div> )
)}
      
      </div>
     
    </div>
  );
}

export default RegistrationForm;
