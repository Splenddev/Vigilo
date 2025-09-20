import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import { LuX, LuUpload, LuCircleAlert } from 'react-icons/lu';
import {
  academicSessionRegex,
  emailRegex,
  matricNoRegex,
} from '../../../utils/regex';
import { inferHeadersQuick } from '../../../utils/inferHeadersQuick';
import useRoster from '../../../hooks/useRoster';
import { useBodyScrollLock } from '../../../hooks/useBodyScrollLock';
import { useGlobalSuccessModal } from '../../../context/SuccessModalProvider';
import {
  renderStep1,
  renderStep2,
  renderStep3,
  renderStepIndicator,
} from './RosterUploadComponents';
import * as XLSX from 'xlsx';

function validateRow(mapped) {
  const problems = [];
  if (!mapped.matricNumber || !matricNoRegex.test(mapped.matricNumber.trim())) {
    problems.push('Invalid matric number format');
  }
  if (mapped.email && !emailRegex.test(mapped.email.trim())) {
    problems.push('Invalid email');
  }
  if (!mapped.firstName || !mapped.lastName) {
    problems.push('Missing name');
  }
  return problems;
}

export default function RosterUploadModal({
  isOpen,
  groupId,
  onAction = null,
  onClose,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState(null);
  const [rawRows, setRawRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    matricNumber: '',
    department: '',
    level: '',
  });
  const [session, setSession] = useState('');
  const [parsedPreview, setParsedPreview] = useState([]);
  const [invalidRows, setInvalidRows] = useState([]);
  const [duplicateMatrics, setDuplicateMatrics] = useState([]);
  const [parsing, setParsing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const fileInputRef = useRef(null);

  const { createRoster } = useRoster();
  const { openSuccessModal } = useGlobalSuccessModal();

  const reset = () => {
    setCurrentStep(1);
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
    const keys = Object.keys(sampleRow || {});
    setHeaders(keys);
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

  const handleFile = (pickedFile) => {
    if (!pickedFile) return;
    setFile(pickedFile);
    setParsing(true);
    setServerError(null);

    const fileExtension = pickedFile.name.split('.').pop().toLowerCase();

    if (fileExtension === 'csv') {
      // ✅ CSV parsing
      Papa.parse(pickedFile, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        worker: true,
        complete: (results) => {
          const rows = results.data || [];
          setRawRows(rows);
          if (rows.length > 0) {
            inferHeaders(rows[0]);
            setCurrentStep(2);
          }
          setParsing(false);
        },
        error: (err) => {
          console.error('Parse error', err);
          setServerError(
            'Failed to parse CSV file. Please check the file format.'
          );
          setParsing(false);
        },
      });
    } else if (['xlsx', 'xls'].includes(fileExtension)) {
      // ✅ Excel parsing
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0]; // first sheet
          const sheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' }); // keep empty cells
          setRawRows(rows);
          if (rows.length > 0) {
            inferHeaders(rows[0]);
            setCurrentStep(2);
          }
          setParsing(false);
        } catch (err) {
          console.error('Excel parse error', err);
          setServerError('Failed to parse Excel file. Please check the file.');
          setParsing(false);
        }
      };
      reader.readAsArrayBuffer(pickedFile);
    } else {
      setServerError('Unsupported file type. Please upload CSV or Excel.');
      setParsing(false);
    }
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

    const matCount = {};
    mapped.forEach((m) => {
      const key = (m.matricNumber || '').toUpperCase();
      if (!key) return;
      matCount[key] = (matCount[key] || 0) + 1;
    });
    const duplicates = Object.keys(matCount).filter((k) => matCount[k] > 1);

    const invalids = [];
    mapped.forEach((m) => {
      const reasons = validateRow(m);
      if (m.matricNumber && duplicates.includes(m.matricNumber.toUpperCase())) {
        reasons.push('Duplicate matric number');
      }
      if (reasons.length > 0)
        invalids.push({ rowIndex: m.__rowIndex, reasons, mapped: m });
    });

    setParsedPreview(mapped.slice(0, 20));
    setInvalidRows(invalids);
    setDuplicateMatrics(duplicates);
  }, [rawRows, mapping]);

  const handleAutoMap = () => {
    if (!rawRows.length) return;
    const sampleRow = rawRows[0];
    const autoMapping = inferHeadersQuick(sampleRow);
    setMapping(autoMapping);
  };

  const removeRow = (index) => {
    const copy = [...rawRows];
    if (index < 0 || index >= copy.length) return;
    copy.splice(index, 1);
    setRawRows(copy);
  };

  const downloadInvalidCSV = () => {
    const rows = invalidRows.map((ir) => ({
      rowIndex: ir.rowIndex + 1,
      issues: ir.reasons.join('; '),
      ...ir.mapped,
    }));
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
    return rawRows
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
  };

  const handleUpload = async () => {
    setUploading(true);
    setServerError(null);

    const payload = prepareUploadPayload();
    if (payload.length === 0) {
      setServerError(
        'No valid students to upload. Please fix the issues first.'
      );
      setUploading(false);
      return;
    }

    if (!academicSessionRegex.test(session)) {
      toast.error('Invalid session format. Use YYYY/YYYY.');
      return;
    }

    try {
      const res = await createRoster({
        groupId,
        students: payload,
        file,
        session,
      });
      if (res.success) {
        onAction && onAction();
        reset();
        openSuccessModal(res);
        onClose();
      }
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || err.message || 'Upload failed'
      );
    } finally {
      setUploading(false);
    }
  };

  const canProceedToReview = () => {
    return mapping.firstName && mapping.lastName && mapping.matricNumber;
  };

  const validRowsCount = rawRows.length - invalidRows.length;

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-bg-primary rounded-2xl border border-bg-glass-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-bg-glass-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <LuUpload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Upload Student Roster</h2>
              <p className="text-sm text-gray-400">
                Add students to your group via CSV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {renderStepIndicator({ currentStep })}

          {currentStep === 1 &&
            renderStep1({ fileInputRef, file, handleFile, parsing })}
          {currentStep === 2 &&
            renderStep2({
              rawRows,
              handleAutoMap,
              setCurrentStep,
              canProceedToReview,
              mapping,
              setMapping,
              headers,
            })}
          {currentStep === 3 &&
            renderStep3({
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
            })}

          {/* Error Display */}
          {serverError && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
              <div className="flex items-center gap-2">
                <LuCircleAlert className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-300">{serverError}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
