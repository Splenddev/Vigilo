import {
  FiFileText,
  FiVideo,
  FiImage,
  FiLink,
  FiDownload,
} from 'react-icons/fi';
import Anchor from '../../../components/atoms/Anchor';

const fileTypeIcon = (type) => {
  switch (type) {
    case 'pdf':
    case 'docx':
    case 'pptx':
    case 'txt':
      return <FiFileText className="w-5 h-5 text-blue-400" />;
    case 'image':
      return <FiImage className="w-5 h-5 text-green-400" />;
    case 'video':
      return <FiVideo className="w-5 h-5 text-purple-400" />;
    case 'link':
      return <FiLink className="w-5 h-5 text-pink-400" />;
    default:
      return <FiFileText className="w-5 h-5 text-slate-400" />;
  }
};

const SessionMaterialsList = ({ materials }) => {
  return (
    <div className="card space-y-4">
      {/* Heading */}
      <h3 className="text-lg font-semibold text-t-primary">
        Session Materials
      </h3>

      {/* Empty State */}
      {!materials || materials.length === 0 ? (
        <div className="text-sm text-slate-400 p-4 border border-white/10 rounded-md text-center">
          No materials uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-bg-glass-xs shadow-sm rounded-lg border border-bg-glass-sm hover:border-bg-glass-md transition">
              {/* Left: Icon + Name */}
              <div className="flex items-center space-x-3">
                {fileTypeIcon(item.type)}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-medium text-t-primary text-sm">
                    {item.name}
                  </span>
                  <span className="text-xs text-t-tertiary">
                    {item.size} • {item.uploadedAt}
                  </span>
                </div>
              </div>
              {/* Right: Download Action */}
              <Anchor
                href={item.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-blue-400">
                <FiDownload className="w-4 h-4 mr-1" />
              </Anchor>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionMaterialsList;
