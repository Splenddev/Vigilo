const Dropdown = ({ icon, className = '', label, onAction }) => {
  const Icon = icon;
  return (
    <div>
      <button
        onClick={() => onAction()}
        className={`flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 ${className}`}>
        <Icon className="w-4 h-4 mr-3" /> {label}
      </button>
    </div>
  );
};

export default Dropdown;
