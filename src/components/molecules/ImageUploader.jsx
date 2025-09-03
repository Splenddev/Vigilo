import { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import Button from '../atoms/Button';

const getInitials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

const ImageUploader = ({
  name = '',
  value = null, // image URL or File
  onChange = () => {},
  maxSizeMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
}) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG, GIF allowed.');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB.`);
      return;
    }

    setError('');
    onChange(file);
  };

  const handleRemove = () => {
    setError('');
    onChange(null);
    fileInputRef.current.value = ''; // reset input
  };

  return (
    <div className="flex items-center gap-6">
      {/* Avatar Preview */}
      <div
        className={`w-24 h-24 rounded-full shadow-md border-2 flex items-center justify-center overflow-hidden 
          ${
            value
              ? 'border-slate-300 bg-white'
              : ' border-primary-cyan bg-gradient-to-br from-purple-500 to-pink-500'
          }`}>
        {value ? (
          <img
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-white">
            {getInitials(name)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div>
        <input
          type="file"
          accept={allowedTypes.join(',')}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex gap-2">
          <Button
            text={value ? 'Change' : 'Upload'}
            icon={FiUpload}
            size="lg"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          />
          {value && (
            <Button
              text="Remove"
              icon={FiX}
              size="lg"
              type="button"
              variant="danger"
              onClick={handleRemove}
            />
          )}
        </div>

        <p className="text-sm text-slate-400 mt-2">
          JPG, PNG or GIF. Max size {maxSizeMB}MB.
        </p>
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;
