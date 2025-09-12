import React, { useState, useMemo, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import { LuX, LuUpload, LuDownload, LuTrash2 } from 'react-icons/lu';
import { emailRegex, matricNoRegex } from '../../../utils/regex';
import Select from '../../../components/molecules/Select';
import { inferHeadersQuick } from '../../../utils/inferHeadersQuick';
import useRoster from '../../../hooks/useRoster';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';

const DEFAULT_FIELD_OPTIONS = [
  { key: '', label: '— select column —' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'matricNumber', label: 'Matric Number' },
  { key: 'department', label: 'Department' },
  { key: 'level', label: 'Level' },
];

function validateRow(mapped) {
  const problems = [];
  if (!mapped.matricNumber || !matricNoRegex.test(mapped.matricNumber.trim())) {
    problems.push('Invalid matric number format (expected YY/DEPTCODE/NNNN)');
  }
  if (mapped.email && !emailRegex.test(mapped.email.trim())) {
    problems.push('Invalid email');
  }
  if (!mapped.firstName || !mapped.lastName) {
    problems.push('Missing first or last name');
  }
  return problems;
}

export default function RosterUploadModal({
  groupId,
  schoolId = null,
  onClose,
}) {
  const [file, setFile] = useState(null);
  const [rawRows, setRawRows] = useState([]); // array of objects parsed by papaparse (header true)
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    matricNumber: '',
    department: '',
    level: '',
  });
  const [parsedPreview, setParsedPreview] = useState([]); // after mapping
  const [invalidRows, setInvalidRows] = useState([]); // { rowIndex, reasons, mapped }
  const [duplicateMatrics, setDuplicateMatrics] = useState([]);
  const [parsing, setParsing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const fileInputRef = useRef(null);

  const { createRoster: uploadRoster } = useRoster();

  // --- Helpers ---
  const reset = () => {
    setFile(null);
    setRawRows([]);
    setHeaders([]);
    setMapping({
      firstName: '',
      lastName: '',
      email: '',
      matricNumber: '',
      department: '',
      level: '',
    });
    setParsedPreview([]);
    setInvalidRows([]);
    setDuplicateMatrics([]);
    setParsing(false);
    setUploading(false);
    setServerError(null);
  };

  const inferHeaders = (sampleRow) => {
    // prefer obvious keys; normalize headers
    const keys = Object.keys(sampleRow || {});
    setHeaders(keys);
    // basic auto-mapping heuristics
    const map = { ...mapping };
    const normalize = (h) => h.toLowerCase().replace(/[^a-z0-9]/g, '');
    keys.forEach((h) => {
      const n = normalize(h);
      if (!map.firstName && /(first|fname|given)/.test(n)) map.firstName = h;
      if (!map.lastName && /(last|lname|surname)/.test(n)) map.lastName = h;
      if (!map.email && /(email|e-mail)/.test(n)) map.email = h;
      if (!map.matricNumber && /(matric|reg(no|no.)|registration|matr)/.test(n))
        map.matricNumber = h;
      if (!map.department && /(department|dept)/.test(n)) map.department = h;
      if (!map.level && /(level|class)/.test(n)) map.level = h;
    });
    setMapping(map);
  };

  // Parse with PapaParse
  const handleFile = (pickedFile) => {
    if (!pickedFile) return;
    setFile(pickedFile);
    setParsing(true);
    setServerError(null);

    Papa.parse(pickedFile, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      worker: true,
      complete: (results) => {
        const rows = results.data || [];
        setRawRows(rows);
        if (rows.length > 0) inferHeaders(rows[0]);
        setParsing(false);
      },
      error: (err) => {
        console.error('Parse error', err);
        setServerError(
          'Failed to parse CSV file. Make sure it is a valid CSV.'
        );
        setParsing(false);
      },
    });
  };

  useEffect(() => {
    if (!rawRows || rawRows.length === 0) {
      setParsedPreview([]);
      setInvalidRows([]);
      setDuplicateMatrics([]);
      return;
    }

    const mapped = rawRows.map((r, idx) => {
      const pick = (col) => {
        const v = mapping[col];
        if (!v) return '';
        // tolerate objects or nested values
        return (typeof r[v] === 'string' ? r[v].trim() : r[v] ?? '').toString();
      };
      return {
        __rowIndex: idx,
        firstName: pick('firstName'),
        lastName: pick('lastName'),
        email: pick('email'),
        matricNumber: pick('matricNumber'),
        department: pick('department'),
        level: pick('level'),
        raw: r,
      };
    });

    // find duplicates by matricNumber
    const matCount = {};
    mapped.forEach((m) => {
      const key = (m.matricNumber || '').toUpperCase();
      if (!key) return;
      matCount[key] = (matCount[key] || 0) + 1;
    });
    const duplicates = Object.keys(matCount).filter((k) => matCount[k] > 1);

    // validate each mapped row
    const invalids = [];
    mapped.forEach((m) => {
      const reasons = validateRow(m);
      // detect duplicates
      if (m.matricNumber && duplicates.includes(m.matricNumber.toUpperCase())) {
        reasons.push('Duplicate matric in file');
      }
      if (reasons.length > 0)
        invalids.push({ rowIndex: m.__rowIndex, reasons, mapped: m });
    });

    setParsedPreview(mapped.slice(0, 20)); // store small preview
    setInvalidRows(invalids);
    setDuplicateMatrics(duplicates);
  }, [rawRows, mapping]);

  // Remove a problematic row
  const removeRow = (index) => {
    const copy = [...rawRows];
    if (index < 0 || index >= copy.length) return;
    copy.splice(index, 1);
    setRawRows(copy);
  };

  const handleAutoMap = () => {
    if (!rawRows.length) return;

    const sampleRow = rawRows[0]; // first row as sample
    const mapping = inferHeadersQuick(sampleRow);
    setMapping(mapping); // assuming you keep a headerMapping state
  };

  const downloadInvalidCSV = () => {
    const rows = invalidRows.map((ir) => {
      return {
        rowIndex: ir.rowIndex,
        reasons: ir.reasons.join('; '),
        ...ir.mapped,
      };
    });
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invalid_rows_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const prepareUploadPayload = () => {
    const invalidSet = new Set(invalidRows.map((i) => i.rowIndex));
    const clean = rawRows
      .map((r) => {
        const pick = (col) =>
          mapping[col] ? (r[mapping[col]] ?? '').toString().trim() : '';
        return {
          firstName: pick('firstName'),
          lastName: pick('lastName'),
          email: pick('email'),
          matricNumber: pick('matricNumber'),
          department: pick('department'),
          level: pick('level'),
        };
      })
      .filter((_, idx) => !invalidSet.has(idx));
    return clean;
  };

  const handleUpload = async () => {
    setUploading(true);
    setServerError(null);

    const payload = prepareUploadPayload();
    if (payload.length === 0) {
      setServerError(
        'No valid rows to upload. Fix invalid rows or upload a different file.'
      );
      setUploading(false);
      return;
    }

    try {
      const res = await uploadRoster({ groupId, students: payload, schoolId });
      if (res.success) {
        setUploading(false);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || err.message || 'Upload failed'
      );
      setUploading(false);
    }
  };

  useBodyScrollLock();

  // Render helpers
  const columns = useMemo(() => headers, [headers]);
  const previewRows = parsedPreview;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* backdrop */}
      <div
        className="absolute inset-0 glass-strong backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <LuUpload className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold">Upload Student Roster</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/5">
            <LuX className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: file input */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="text-sm font-medium text-gray-300">
                CSV File
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-700 p-4 flex flex-col items-center justify-center text-center hover:border-blue-400 transition">
                <p className="text-sm text-gray-300 mb-2">
                  {file ? file.name : 'Click or drop file here'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    type="button"
                    className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                    Choose file
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
                {parsing && (
                  <p className="text-xs text-gray-400 mt-2">Parsing CSV…</p>
                )}
              </div>

              <div className="mt-3 text-xs text-gray-400">
                <p>
                  Expected columns: matricNumber, firstName, lastName, email
                  (optional), department (optional), level (optional).
                </p>
                <p className="mt-1">
                  You’ll be able to map columns if your CSV headers differ.
                </p>
              </div>
            </div>

            {/* mapping UI */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-300">
                Map CSV Columns
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  'firstName',
                  'lastName',
                  'email',
                  'matricNumber',
                  'department',
                  'level',
                ].map((field) => (
                  <div
                    key={field}
                    className="flex flex-col">
                    <Select
                      label={
                        field === 'matricNumber'
                          ? 'Matric Number (required)'
                          : field === 'firstName'
                          ? 'First Name'
                          : field === 'lastName'
                          ? 'Last Name'
                          : field === 'email'
                          ? 'Email'
                          : field
                      }
                      value={mapping[field] || ''}
                      onChange={(e) =>
                        setMapping((m) => ({ ...m, [field]: e.target.value }))
                      }
                      options={columns}
                      placeholder="— select column —"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button
                  className="text-sm text-blue-400 hover:underline"
                  onClick={handleAutoMap}>
                  Auto-detect columns
                </button>
              </div>
            </div>
          </div>

          {/* preview & validation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">Preview (first 20 rows)</h4>
              <div className="flex items-center gap-3">
                {invalidRows.length > 0 && (
                  <>
                    <button
                      onClick={downloadInvalidCSV}
                      className="text-xs text-yellow-300 hover:underline">
                      Download invalid rows
                    </button>
                    <button
                      onClick={() =>
                        invalidRows.forEach((ir) => removeRow(ir.rowIndex))
                      }
                      className="text-xs text-red-400 hover:underline">
                      Remove invalid rows
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    const csv = Papa.unparse(rawRows);
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `roster_preview_${Date.now()}.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="text-xs text-gray-300 hover:underline">
                  Download preview
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded border border-white/5">
              <table className="min-w-full text-sm">
                <thead className="bg-white/3">
                  <tr>
                    <th className="p-2 text-left">#</th>
                    <th className="p-2 text-left">Matric</th>
                    <th className="p-2 text-left">First</th>
                    <th className="p-2 text-left">Last</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Department</th>
                    <th className="p-2 text-left">Level</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="p-4 text-xs text-gray-400">
                        No rows to preview. Upload a CSV and map columns.
                      </td>
                    </tr>
                  )}
                  {previewRows.map((r, i) => {
                    const isInvalid = invalidRows.some(
                      (ir) => ir.rowIndex === r.__rowIndex
                    );
                    const statusText = isInvalid
                      ? invalidRows
                          .find((ir) => ir.rowIndex === r.__rowIndex)
                          .reasons.join('; ')
                      : 'OK';
                    return (
                      <tr
                        key={i}
                        className={isInvalid ? 'bg-red-900/10' : ''}>
                        <td className="p-2">{r.__rowIndex + 1}</td>
                        <td className="p-2">{r.matricNumber}</td>
                        <td className="p-2">{r.firstName}</td>
                        <td className="p-2">{r.lastName}</td>
                        <td className="p-2">{r.email}</td>
                        <td className="p-2">{r.department}</td>
                        <td className="p-2">{r.level}</td>
                        <td className="p-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isInvalid
                                ? 'bg-red-700 text-white'
                                : 'bg-green-700 text-white'
                            }`}>
                            {statusText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* summary & actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-gray-300">
              <p>
                Rows parsed: <strong>{rawRows.length}</strong>
              </p>
              <p>
                Invalid rows:{' '}
                <strong className="text-yellow-300">
                  {invalidRows.length}
                </strong>
              </p>
              <p>
                Duplicate matric numbers in file:{' '}
                <strong className="text-red-300">
                  {duplicateMatrics.length}
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={uploading || rawRows.length === 0}
                onClick={handleUpload}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  uploading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}>
                {uploading ? 'Uploading…' : 'Upload roster'}
              </button>

              <button
                onClick={() => {
                  reset();
                }}
                className="px-4 py-2 rounded-lg text-sm border border-white/10">
                Reset
              </button>
            </div>
          </div>

          {serverError && (
            <div className="text-sm text-red-400">{serverError}</div>
          )}
        </div>
      </div>
    </div>
  );
}
