import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const licenseTypes = [
    'Microsoft Office',
    'Adobe Creative Cloud',
    'IntelliJ IDEA',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }
    if (!formData.company.trim()) tempErrors.company = 'Company is required';
    if (!formData.licenseType) tempErrors.licenseType = 'Please select a license type';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
      setErrors({});
    }
  };

  return (
    <section className="py-20 px-6 bg-[var(--color-background)]">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-[var(--color-primary)]">
          Contact Us
        </h2>
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded text-center">
            Thanks for contacting us! We will get back to you shortly.
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {['name', 'email', 'company'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-[var(--color-text)] mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="licenseType" className="block text-[var(--color-text)] mb-2">License Type</label>
            <select
              id="licenseType"
              name="licenseType"
              value={formData.licenseType}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none ${errors.licenseType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a license type</option>
              {licenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.licenseType && <p className="text-red-500 text-sm mt-1">{errors.licenseType}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-[var(--color-text)] mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-accent)] outline-none resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              rows={4}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>
          <div className="text-center">
            <button type="submit" className="w-full py-3 px-6 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
