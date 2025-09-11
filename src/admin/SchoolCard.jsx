import React from 'react';
import { FaUniversity } from 'react-icons/fa';
import { useSchoolStore } from '../stores/schoolStore';
import { FiCheckCircle } from 'react-icons/fi';
import { LuUniversity } from 'react-icons/lu';

const SchoolCard = ({ school, onAction }) => {
  const { selectedSchool, selectSchool } = useSchoolStore();

  const isSelected = selectedSchool?._id === school._id;

  return (
    <div
      onClick={() => {
        selectSchool(school);
        onAction(school._id);
      }}
      className={`
        flex relative items-center gap-4 cursor-pointer rounded-xl border-2 p-4 transition 
        ${
          isSelected
            ? 'border-secondary bg-secondary/5'
            : 'border-gray-200 hover:border-secondary'
        }
      `}>
      <div className="text-secondary">
        <LuUniversity size={28} />
      </div>
      {isSelected && (
        <span className="absolute top-2 right-2">
          <FiCheckCircle className="text-secondary text-xl" />
        </span>
      )}
      <div>
        <h3 className="font-semibold text-lg">{school.name}</h3>
        <p className="text-sm text-gray-500">
          {school.address || 'No address provided'}
        </p>
      </div>
    </div>
  );
};

export default SchoolCard;
