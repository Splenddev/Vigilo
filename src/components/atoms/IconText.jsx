const IconText = ({
  icon: Icon,
  text,
  iconClasses = '',
  containerClass = '',
}) => {
  return (
    <span className={`flex items-center gap-1.5 ${containerClass}`}>
      {Icon && <Icon className={`w-3 h-3 ${iconClasses} `} />}
      {text && text}
    </span>
  );
};

export default IconText;
