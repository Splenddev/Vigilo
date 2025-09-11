import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/molecules/FormInput';
import TextArea from '../components/atoms/TextArea';
import Button from '../components/atoms/Button';
import { useSchools } from '../hooks/useSchools';
import Navbar from '../components/common/Navbar';

const CreateSchool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  const { createSchool, loading, error } = useSchools();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('School created:', formData);
    try {
      const res = await createSchool(formData);
      if (res.status === 201) alert('Created successfully');
    } catch (err) {
      alert(err);
    }
    // TODO: connect to backend API
    // navigate('/lecturer/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-heading-xl gradient-text">
            Register a New School
          </h1>
          <p className="text-body-sm text-gray-400 mt-2 max-w-2xl mx-auto">
            Add your institution to the system. Only authorized users can
            perform this action.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card grid grid-cols-1 gap-6 animate-fade-in-up">
          <FormInput
            label="School Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. University of Ibadan"
          />
          <FormInput
            label="School Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="e.g. UI-01"
          />
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description about the institution..."
            maxLength={300}
            showClear
            onClear={() => setFormData((p) => ({ ...p, description: '' }))}
          />
          {error && <p>{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}>
              Create School
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchool;
