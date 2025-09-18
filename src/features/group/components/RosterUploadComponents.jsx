import React from 'react';
import {
  LuCheck,
  LuCircleAlert,
  LuFileText,
  LuUpload,
  LuZap,
} from 'react-icons/lu';
import Select from '../../../components/molecules/Select';

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

export const renderStepIndicator = () => (
  <div className="flex items-center justify-center mb-6">
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            step <= currentStep
              ? 'bg-blue-600 text-white'
              : 'bg-bg-secondary text-gray-400'
          }`}>
          {step < currentStep ? <LuCheck className="w-4 h-4" /> : step}
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
  <div className="text-center">
    <div className="mb-6">
      <LuFileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Upload Your CSV File</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Please upload a <strong>CSV file</strong>. Think of it like a simplified
        spreadsheet—each row represents one student, and each column represents
        a piece of information about them.
      </p>
    </div>

    <div
      onClick={() => fileInputRef.current?.click()}
      className="mx-auto max-w-md cursor-pointer rounded-xl border-2 border-dashed border-gray-600 p-8 hover:border-blue-400 hover:bg-blue-400/5 transition-all duration-200">
      <LuUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p className="text-lg font-medium mb-2">
        {file ? file.name : 'Drop your CSV file here'}
      </p>
      <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
      <button
        type="button"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
        Choose File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>

    {parsing && (
      <div className="mt-4 flex items-center justify-center gap-2 text-blue-400">
        <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full" />
        <span>Processing your file...</span>
      </div>
    )}

    <div className="mt-6 text-sm text-gray-400 max-w-lg mx-auto text-left">
      <p className="mb-3 font-medium text-gray-300">
        Expected columns include:
      </p>
      <ul className="space-y-2">
        <li>
          <strong>Matric Number</strong> – The student’s unique ID number (e.g.{' '}
          <code>ENG/2021/001</code>). Think of it as their official registration
          number.
        </li>
        <li>
          <strong>First Name</strong> – Student’s given name (e.g.{' '}
          <code>John</code>).
        </li>
        <li>
          <strong>Last Name</strong> – Student’s surname/family name (e.g.{' '}
          <code>Doe</code>).
        </li>
        <li>
          <strong>Email</strong> – Student’s email address (e.g.{' '}
          <code>john.doe@example.com</code>). Useful for communication and
          login.
        </li>
        <li>
          <strong>Department</strong> – The academic department or program (e.g.{' '}
          <code>Mechanical Engineering</code>).
        </li>
        <li>
          <strong>Level</strong> – The student’s current level/year (e.g.{' '}
          <code>400</code> for 4th year).
        </li>
      </ul>

      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg text-xs">
        <p className="mb-2 font-semibold text-gray-300">Example row:</p>
        <code className="block whitespace-pre overflow-x-auto">
          ENG/2021/001, John, Doe, john.doe@example.com, Mechanical Engineering,
          400
        </code>
      </div>

      <p className="mt-4">
        Don’t worry if your file uses slightly different headers (like{' '}
        <em>“Reg No”</em> instead of <em>“Matric Number”</em>). In the next
        step, you’ll be able to{' '}
        <strong>match your columns to the required fields</strong>.
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
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Map Your Columns</h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Sometimes your file may use different column names (like{' '}
          <em>"Reg No"</em> instead of <em>"Matric Number"</em>). Use this step
          to <strong>match each required field</strong> with the correct column
          in your file. Required fields are marked with{' '}
          <span className="text-red-400 font-semibold">*</span>.
        </p>
      </div>

      {/* File summary + auto-detect */}
      <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">
            ✅ Found <strong>{rawRows.length}</strong> students in your file
          </span>
          <button
            onClick={handleAutoMap}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            <LuZap className="w-4 h-4" />
            Auto-detect mapping
          </button>
        </div>
        <p className="text-xs text-gray-500">
          We’ll try to guess the best matches for you (e.g. <em>"Reg No"</em> →{' '}
          <em>"Matric Number"</em>). You can adjust manually if something looks
          off.
        </p>
      </div>

      {/* Mapping fields */}
      <div className="grid md:grid-cols-2 gap-4">
        {defaultMappingFields.map((field) => (
          <div
            key={field.key}
            className="bg-bg-secondary rounded-lg p-3">
            <Select
              label={field.label}
              value={mapping[field.key] || ''}
              onChange={(e) =>
                setMapping((m) => ({ ...m, [field.key]: e.target.value }))
              }
              required={field.required}
              options={headers}
              placeholder="— select column —"
              className={`w-full ${
                field.required && !mapping[field.key] ? 'border-red-500' : ''
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">{field.desc}</p>

            {/* Show preview of first 2 values */}
            {mapping[field.key] && (
              <div className="mt-2 text-xs text-gray-400">
                Example:{' '}
                <code className="bg-bg-tertiary px-1 py-0.5 rounded">
                  {rawRows[0]?.[mapping[field.key]] || '—'}
                </code>
                {rawRows[1] && (
                  <>
                    ,{' '}
                    <code className="bg-bg-tertiary px-1 py-0.5 rounded">
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
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-4 py-2 text-gray-400 hover:text-t-primary transition-colors">
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
}) => (
  <div>
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold mb-2">Review & Upload</h3>
      <p className="text-gray-400">
        Review your data before uploading to the system
      </p>
    </div>

    {/* Summary Cards */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-green-500/20 border border-green-600/30 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-green-400">
          {validRowsCount}
        </div>
        <div className="text-sm text-green-600">Valid Students</div>
      </div>
      <div className="bg-yellow-500/20 border border-yellow-600/30 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-yellow-400">
          {invalidRows.length}
        </div>
        <div className="text-sm text-yellow-600">Issues Found</div>
      </div>
      <div className="bg-red-500/20 border border-red-600/30 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-red-400">
          {duplicateMatrics.length}
        </div>
        <div className="text-sm text-red-600">Duplicates</div>
      </div>
    </div>

    {/* Issues Alert */}
    {invalidRows.length > 0 && (
      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <LuCircleAlert className="w-5 h-5 text-yellow-400" />
          <span className="font-medium text-yellow-600">Issues Found</span>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          Some rows have issues and will be skipped during upload.
        </p>
        <div className="flex gap-2">
          <button
            onClick={downloadInvalidCSV}
            className="text-sm px-3 py-1 bg-yellow-700 hover:bg-yellow-600 text-white rounded transition-colors">
            Download Issues Report
          </button>
          <button
            onClick={() => invalidRows.forEach((ir) => removeRow(ir.rowIndex))}
            className="text-sm px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded transition-colors">
            Remove Problem Row
          </button>
        </div>
      </div>
    )}

    {/* Preview Table */}
    <div className="bg-bg-secondary rounded-lg overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <span className="font-medium">Preview (first 10 rows)</span>
        <span className="text-sm text-gray-400">Showing mapped data</span>
      </div>
      <div className="overflow-x-auto max-h-60 overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg-tertiary sticky top-0 text-t-secondary">
            <tr>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Matric</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Department</th>
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
                  <td className="p-2">
                    {isInvalid ? (
                      <span className="text-red-400">✗</span>
                    ) : (
                      <span className="text-green-400">✓</span>
                    )}
                  </td>
                  <td className="p-2 font-mono text-xs">{r.matricNumber}</td>
                  <td className="p-2">
                    {`${r.firstName} ${r.lastName}`.trim()}
                  </td>
                  <td className="p-2 text-gray-400">{r.email}</td>
                  <td className="p-2 text-gray-400">{r.department}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-between items-center">
      <button
        onClick={() => setCurrentStep(2)}
        className="px-4 py-2 text-gray-400 hover:text-t-primary transition-colors">
        ← Back to Mapping
      </button>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-lg transition-colors">
          Start Over
        </button>
        <button
          onClick={handleUpload}
          disabled={uploading || validRowsCount === 0}
          className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
            uploading || validRowsCount === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>
          {uploading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Uploading...
            </>
          ) : (
            <>
              <LuUpload className="w-4 h-4" />
              Upload {validRowsCount} Students
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);
