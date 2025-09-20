const IconText = ({
  icon: Icon,
  text,
  iconClassName = '',
  className = '',
  subText = '',
}) => {
  return (
    <span className={`flex items-center gap-1.5 text-gray-400 ${className}`}>
      {Icon && <Icon className={`w-3 h-3 ${iconClassName} `} />}
      {text && text}
      {subText && subText}
    </span>
  );
};

export default IconText;
