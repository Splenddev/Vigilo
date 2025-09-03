/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { fadeIn, fadeInUpChild } from '../../../utils/animationVariants';
import { motion } from 'framer-motion';
import ThemeToggler from '../../../components/common/ThemeToggler';
import Form from '../../../components/molecules/Form';

const GeneralSettings = ({ user }) => {
  const { firstName, lastName, email } = user || {};
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: firstName || 'John',
    lastName: lastName || 'Doe',
    email: email || 'john.doe@university.edu',
  });

  const formFields = [
    {
      type: 'text',
      component: 'input',
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Enter your first name',
      value: formData.firstName,
      required: true,
      props: {
        maxLength: 50,
        autoComplete: 'name',
      },
      validation: {
        pattern: /^[A-Za-z]+$/,
        message: 'Only letters are allowed',
      },
    },

    {
      type: 'text',
      component: 'input',
      label: 'Last Name',
      value: formData.lastName,
      name: 'lastName',
      placeholder: 'Enter your last name',
      required: true,
      props: {
        maxLength: 50,
        autoComplete: 'name',
      },
      validation: {
        pattern: /^[A-Za-z]+$/,
        message: 'Only letters are allowed',
      },
    },
    {
      type: 'email',
      component: 'input',
      label: 'Email Address',
      name: 'email',
      placeholder: 'you@example.com',
      required: true,
      value: formData.email,
      readOnly: true,
      props: {
        autoComplete: 'email',
      },
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address',
      },
      disabledReason: 'Email editing is not allowed at the moment',
    },
  ];

  const onChange = (updatedValues) => {
    console.log('Form values changed: ', updatedValues);
    setFormData(updatedValues);
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="space-y-6">
      <Form
        formInputsData={formFields}
        onChange={onChange}
        title="Profile Information"
      />
      <Form
        title="Profile Picture"
        formInputsData={[
          { name: `${firstName} ${lastName}`, component: 'image' },
        ]}
        mode="upload"
        className="flex items-center gap-6"
      />

      <motion.div
        variants={fadeInUpChild}
        className="card-hover">
        <h3 className="text-xl font-bold text-t-primary mb-6">
          Theme Preferences
        </h3>
        <ThemeToggler mode="options" />
      </motion.div>
    </motion.div>
  );
};

export default GeneralSettings;
