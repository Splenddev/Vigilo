import React from 'react';
import {
  LuCheck,
  LuCircleAlert,
  LuFileText,
  LuUpload,
  LuZap,
} from 'react-icons/lu';
import Select from '../../../components/molecules/Select';
import FormInput from '../../../components/molecules/FormInput';
import { academicSessionRegex } from '../../../utils/regex';
import { useState } from 'react';

const defaultMappingFields = [
  {
    key: 'matricNumber',
    label: 'Matric Number',
    required: true,
    desc: 'Unique student registration ID',
  },
  {
    key: 'firstName',
    label: 'First Name',
    required: true,
    desc: 'Student’s given name',
  },
  {
    key: 'lastName',
    label: 'Last Name',
    required: true,
    desc: 'Student’s family/surname',
  },
  {
    key: 'email',
    label: 'Email',
    required: false,
    desc: 'Contact email (optional)',
  },
  {
    key: 'department',
    label: 'Department',
    required: false,
    desc: 'Student’s academic department',
  },
  {
    key: 'level',
    label: 'Level',
    required: false,
    desc: 'Year/level of study',
  },
];

export const renderStepIndicator = ({ currentStep }) => (
  <div className='flex items-center justify-center mb-6'>
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            step <= currentStep
              ? 'bg-blue-600 text-white'
              : 'bg-bg-secondary text-gray-400'
          }`}>
          {step < currentStep ? <LuCheck className='w-4 h-4' /> : step}
        </div>
        {step < 3 && (
          <div
            className={`w-12 h-0.5 mx-2 ${
              step < currentStep ? 'bg-blue-600' : 'bg-bg-secondary'
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

export const renderStep1 = ({ fileInputRef, file, handleFile, parsing }) => (
  <div className='text-center'>
    <div className='mb-6 text-center'>
      <LuFileText className='w-16 h-16 text-blue-400 mx-auto mb-4' />
      <h3 className='text-xl font-semibold mb-2 text-gray-400'>
        Upload Your Student Roster
      </h3>
      <p className='text-gray-400 max-w-md mx-auto'>
        Upload a <strong>CSV or Excel file</strong> containing your class
        roster. Each <em>row</em> should represent a single student, and each{' '}
        <em>column</em>
        should contain a specific detail (e.g., Matric Number, First Name, Last
        Name, Email).
      </p>
      <p className='mt-3 text-gray-500 text-sm'>
        ✅ Accepted formats: <code>.csv</code>, <code>.xlsx</code>
        ⚠️ Ensure required fields (Matric Number, First Name, Last Name) are
        included.
      </p>
    </div>

    <div
      onClick={() => fileInputRef.current?.click()}
      className='mx-auto max-w-md cursor-pointer rounded-xl border-2 border-dashed border-gray-600 p-8 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-200'>
      <LuUpload className='w-12 h-12 text-gray-400 mx-auto mb-4' />
      <p className='text-lg font-medium mb-2 text-t-primary'>
        {file ? file.name : 'Drop your CSV/EXCEL file here'}
      </p>
      <p className='text-sm text-gray-500 mb-4'>or click to browse files</p>
      <button
        type='button'
        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors'>
        Choose File
      </button>
      <input
        ref={fileInputRef}
        type='file'
        accept='.csv,.xlsx,.xls,text/csv'
        className='hidden'
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>

    {parsing && (
      <div className='mt-4 flex items-center justify-center gap-2 text-blue-400'>
        <div className='animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full' />
        <span>Processing your file...</span>
      </div>
    )}

    <div className='mt-6 text-sm text-gray-400 max-w-2xl mx-auto text-left'>
      <p className='mb-3 font-semibold text-gray-300'>
        📌 Required and optional columns for your student roster:
      </p>

      <ul className='space-y-4'>
        <li>
          <strong className='text-gray-400'>Matric Number</strong>
          <span className='text-red-400 font-medium'>
            (Required – Most Important)
          </span>
          <br />
          <span>
            This is the student’s <em>official registration number</em> (e.g.,
            <code className='px-1'>ENG/2021/001</code>).
            <br />
            We use it as the <strong>primary identifier</strong> to avoid
            duplicates and link students across different records. Without this,
            the system cannot reliably match a student to their account.
          </span>
        </li>

        <li>
          <strong className='text-gray-400'>First Name</strong>
          <span className='text-yellow-400 font-medium'>(Required)</span>
          <br />
          <span>
            The student’s given name (e.g., <code className='px-1'>John</code>).
            Helps confirm identity and appears in attendance sheets, reports,
            and notifications.
          </span>
        </li>

        <li>
          <strong className='text-gray-400'>Last Name</strong>
          <span className='text-yellow-400 font-medium'>(Required)</span>
          <br />
          <span>
            The student’s surname or family name (e.g.,{' '}
            <code className='px-1'>Doe</code>). Combined with the first name, it
            ensures names are properly formatted in group lists and official
            records.
          </span>
        </li>

        <li>
          <strong className='text-gray-400'>Email</strong>
          <span className='text-green-400 font-medium'>
            (Highly Recommended)
          </span>
          <br />
          <span>
            A valid student email address (e.g.,{' '}
            <code className='px-1'>john.doe@example.com</code>). This is used
            for{' '}
            <strong>account login, password recovery, and communication</strong>
            . If omitted, students can still be matched by Matric Number, but
            email simplifies account setup.
          </span>
        </li>

        <li>
          <strong className='text-gray-400'>Department</strong>
          <span className='text-blue-400 font-medium'>(Optional)</span>
          <br />
          <span>
            The student’s academic department or program (e.g.,
            <code className='px-1'>Mechanical Engineering</code>). Useful for
            filtering and reporting, but not mandatory for roster matching.
          </span>
        </li>

        <li>
          <strong className='text-gray-400'>Level / Year</strong>
          <span className='text-blue-400 font-medium'>(Optional)</span>
          <br />
          <span>
            The student’s current academic level (e.g.,{' '}
            <code className='px-1'>400</code>
            for 4th year). Helps with analytics, attendance policies, and
            cross-group comparisons, but the system does not rely on it for
            matching.
          </span>
        </li>
      </ul>

      <div className='mt-6 p-4 bg-bg-glass-lg rounded-lg text-xs'>
        <p className='mb-2 font-semibold text-t-primary'>📄 Example row:</p>
        <code className='block whitespace-pre overflow-x-auto'>
          21/ENG/001, John, Doe, john.doe@example.com, Mechanical Engineering,
          400
        </code>
      </div>

      <p className='mt-6 text-t-primary'>
        ⚠️ <strong>Note:</strong> If your file uses different headers (e.g.,{' '}
        <em>“Reg No”</em> instead of <em>“Matric Number”</em>), you’ll be able
        to <strong>map them to the required fields</strong>
        in the next step.
      </p>
    </div>
  </div>
);

export const renderStep2 = ({
  rawRows,
  handleAutoMap,
  setCurrentStep,
  canProceedToReview,
  mapping,
  setMapping,
  headers,
}) => {
  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h3 className='text-xl font-semibold mb-2'>Map Your Columns</h3>
        <p className='text-gray-400 max-w-md mx-auto'>
          Sometimes your file may use different column names (like{' '}
          <em>"Reg No"</em> instead of <em>"Matric Number"</em>). Use this step
          to <strong>match each required field</strong> with the correct column
          in your file. Required fields are marked with{' '}
          <span className='text-red-400 font-semibold'>*</span>.
        </p>
      </div>

      {/* File summary + auto-detect */}
      <div className='bg-gray-800/30 rounded-lg p-4 mb-6'>
        <div className='flex gap-2 sm:items-center justify-between sm:flex-row flex-col items-start mb-3'>
          <span className='text-sm font-medium'>
            ✅ Found <strong>{rawRows.length}</strong> students in your file
          </span>
          <button
            onClick={handleAutoMap}
            className='flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors'>
            <LuZap className='w-4 h-4' />
            Auto-detect mapping
          </button>
        </div>
        <p className='text-xs text-gray-500'>
          We’ll try to guess the best matches for you (e.g. <em>"Reg No"</em> →{' '}
          <em>"Matric Number"</em>). You can adjust manually if something looks
          off.
        </p>
      </div>

      {/* Mapping fields */}
      <div className='grid md:grid-cols-2 gap-4'>
        {defaultMappingFields.map((field) => (
          <div
            key={field.key}
            className='bg-bg-secondary rounded-lg p-3'>
            <Select
              label={field.label}
              value={mapping[field.key] || ''}
              onChange={(e) =>
                setMapping((m) => ({ ...m, [field.key]: e.target.value }))
              }
              required={field.required}
              options={headers}
              placeholder='— select column —'
              className={`w-full ${
                field.required && !mapping[field.key] ? 'border-red-500' : ''
              }`}
            />
            <p className='text-xs text-gray-500 mt-1'>{field.desc}</p>

            {/* Show preview of first 2 values */}
            {mapping[field.key] && (
              <div className='mt-2 text-xs text-gray-400'>
                Example:{' '}
                <code className='bg-bg-tertiary px-1 py-0.5 rounded'>
                  {rawRows[0]?.[mapping[field.key]] || '—'}
                </code>
                {rawRows[1] && (
                  <>
                    ,{' '}
                    <code className='bg-bg-tertiary px-1 py-0.5 rounded'>
                      {rawRows[1]?.[mapping[field.key]]}
                    </code>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className='mt-6 flex justify-between'>
        <button
          onClick={() => setCurrentStep(1)}
          className='px-4 py-2 text-gray-400 hover:text-t-primary transition-colors'>
          ← Back
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!canProceedToReview()}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            canProceedToReview()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}>
          Review & Upload →
        </button>
      </div>
    </div>
  );
};

export const renderStep3 = ({
  validRowsCount,
  invalidRows,
  duplicateMatrics,
  downloadInvalidCSV,
  removeRow,
  parsedPreview,
  reset,
  setCurrentStep,
  handleUpload,
  uploading,
  session,
  setSession,
}) => {
  return (
    <div>
      <div className='text-center mb-6'>
        <h3 className='text-xl font-semibold mb-2'>Review & Upload</h3>
        <p className='text-gray-400'>
          Review your data before uploading to the system
        </p>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-3 gap-4 mb-6'>
        <div className='bg-green-500/20 border border-green-600/30 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-green-400'>
            {validRowsCount}
          </div>
          <div className='text-sm text-green-600'>Valid Students</div>
        </div>
        <div className='bg-yellow-500/20 border border-yellow-600/30 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-yellow-400'>
            {invalidRows.length}
          </div>
          <div className='text-sm text-yellow-600'>Issues Found</div>
        </div>
        <div className='bg-red-500/20 border border-red-600/30 rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-red-400'>
            {duplicateMatrics.length}
          </div>
          <div className='text-sm text-red-600'>Duplicates</div>
        </div>
      </div>

      {/* Issues Alert */}
      {invalidRows.length > 0 && (
        <div className='bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6'>
          <div className='flex items-center gap-2 mb-2'>
            <LuCircleAlert className='w-5 h-5 text-yellow-400' />
            <span className='font-medium text-yellow-600'>Issues Found</span>
          </div>
          <p className='text-sm text-gray-400 mb-3'>
            Some rows have issues and will be skipped during upload.
          </p>
          <div className='flex gap-2'>
            <button
              onClick={downloadInvalidCSV}
              className='text-sm px-3 py-1 bg-yellow-700 hover:bg-yellow-600 text-white rounded transition-colors'>
              Download Issues Report
            </button>
            <button
              onClick={() =>
                invalidRows.forEach((ir) => removeRow(ir.rowIndex))
              }
              className='text-sm px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded transition-colors'>
              Remove Problem Row
            </button>
          </div>
        </div>
      )}

      {/* Preview Table */}
      <div className='bg-bg-secondary rounded-lg overflow-hidden mb-6'>
        <div className='px-4 py-3 border-b border-gray-700 flex items-center justify-between'>
          <span className='font-medium'>Preview (first 10 rows)</span>
          <span className='text-sm text-gray-400'>Showing mapped data</span>
        </div>
        <div className='overflow-x-auto max-h-60 overflow-y-auto'>
          <table className='w-full text-sm'>
            <thead className='bg-bg-tertiary sticky top-0 text-t-secondary'>
              <tr>
                <th className='p-2 text-left'>Status</th>
                <th className='p-2 text-left'>Matric</th>
                <th className='p-2 text-left'>Name</th>
                <th className='p-2 text-left'>Email</th>
                <th className='p-2 text-left'>Department</th>
              </tr>
            </thead>
            <tbody>
              {parsedPreview.slice(0, 10).map((r, i) => {
                const isInvalid = invalidRows.some(
                  (ir) => ir.rowIndex === r.__rowIndex
                );
                return (
                  <tr
                    key={i}
                    className={
                      isInvalid ? 'bg-red-900/10' : 'hover:bg-gray-700/30'
                    }>
                    <td className='p-2'>
                      {isInvalid ? (
                        <span className='text-red-400'>✗</span>
                      ) : (
                        <span className='text-green-400'>✓</span>
                      )}
                    </td>
                    <td className='p-2 font-mono text-xs'>{r.matricNumber}</td>
                    <td className='p-2'>
                      {`${r.firstName} ${r.lastName}`.trim()}
                    </td>
                    <td className='p-2 text-gray-400'>{r.email}</td>
                    <td className='p-2 text-gray-400'>{r.department}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Session Input */}
      <FormInput
        label='Academic Session'
        required
        placeholder='e.g. 2024/2025'
        value={session}
        onChange={(e) => setSession(e.target.value)}
        helpText='Must be in format YYYY/YYYY (e.g. 2024/2025)'
      />

      {/* Action Buttons */}
      <div className='flex mt-4 gap-2 items-center justify-between sm:flex-row flex-col w-full'>
        <button
          onClick={() => setCurrentStep(2)}
          className='px-4 py-2 text-gray-400 hover:text-t-primary transition-colors place-self-start'>
          ← Back to Mapping
        </button>

        <div className='flex gap-3 gap-2 sm:items-center justify-between sm:flex-row flex-col items-end place-self-end'>
          <button
            onClick={reset}
            className='px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors'>
            Start Over
          </button>
          <button
            onClick={() => handleUpload(session)}
            disabled={
              uploading ||
              validRowsCount === 0 ||
              !academicSessionRegex.test(session)
            }
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              uploading ||
              validRowsCount === 0 ||
              !academicSessionRegex.test(session)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
            {uploading ? (
              <>
                <div className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full' />
                Uploading...
              </>
            ) : (
              <>
                <LuUpload className='w-4 h-4' />
                Upload {validRowsCount} Students
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
