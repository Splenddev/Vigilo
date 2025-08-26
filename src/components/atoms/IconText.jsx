const IconText = ({ icon: Icon, text, iconClassName = '', className = '' }) => {
  return (
    <span className={`flex items-center gap-1.5 text-gray-400 ${className}`}>
      {Icon && <Icon className={`w-3 h-3 ${iconClassName} `} />}
      {text && text}
    </span>
  );
};

export default IconText;
