/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';
import { LuSave, LuX } from 'react-icons/lu';
import { fadeInUpChild } from '../../utils/animationVariants';
import FormInput from './FormInput';
import Button from '../atoms/Button';
import ImageUploader from './ImageUploader';

const Form = ({
  formInputsData = [],
  title = 'Form',
  className = 'grid md:grid-cols-2 gap-6',
  mode = 'editing',
  onChange = () => {},
}) => {
  // Extract initial values from formInputsData
  const initialFormValues = formInputsData.reduce((acc, f) => {
    acc[f.name] = f.value ?? '';
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialFormValues);
  const [initialValues, setInitialValues] = useState(initialFormValues);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (file) => {
    console.log('Selected file:', file);
    setAvatar(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formValues, [name]: value };
    setFormValues(updated);
    onChange(updated);
  };

  const handleCancel = () => {
    setFormValues(initialValues);
    setIsEditing(false);
    onChange(initialValues);
  };

  const handleSave = () => {
    setInitialValues(formValues);
    setIsEditing(false);
  };

  const renderInputType = (data) => {
    const { component, readOnly = false, props, ...rest } = data;

    switch (component) {
      case 'input':
        return (
          <FormInput
            {...props}
            {...rest}
            value={formValues[data.name]}
            onChange={handleChange}
            disabled={(mode === 'editing' && !isEditing) || readOnly}
          />
        );
      case 'image':
        return (
          <ImageUploader
            onChange={handleImageChange}
            {...rest}
            value={avatar}
          />
        );

      default:
        return (
          <FormInput
            {...props}
            {...rest}
            value={formValues[data.name]}
            onChange={handleChange}
            disabled={(mode === 'editing' && !isEditing) || readOnly}
          />
        );
    }
  };

  return (
    <motion.div
      variants={fadeInUpChild}
      className="card-hover">
      <h3 className="flex items-center gap-2.5 text-xl font-bold text-t-primary mb-6">
        {title}
        {mode === 'editing' && !isEditing && (
          <FiEdit3
            onClick={() => setIsEditing(true)}
            className="cursor-pointer"
          />
        )}
      </h3>
      <form onSubmit={handleSave}>
        <div className={`${className}`}>
          {formInputsData.map((f) => renderInputType(f))}
        </div>
        {isEditing && (
          <div className="flex flex-col items-end gap-2 py-5">
            <Button
              icon={LuX}
              text="Cancel"
              variant="dangerLight"
              size="sm"
              type="button"
              onClick={handleCancel}
            />
            <Button
              icon={LuSave}
              text="Save Changes"
              type="submit"
              size="sm"
            />
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default Form;
