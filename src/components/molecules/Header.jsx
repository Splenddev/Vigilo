import Title from '../atoms/Title';

const Header = ({
  title,
  subtitle,
  variant = 'default',
  className = '',
  actions, // optional JSX buttons/links
}) => {
  const baseClasses = 'shadow-md mb-4 p-6 rounded-lg';
  const variantClasses = {
    default: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
  };

  return (
    <header
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="text-center max-w-3xl mx-auto">
        <Title
          contents={title}
          className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
        />
        {subtitle && (
          <p className="text-lg md:text-xl opacity-80 mb-6 font-baloo">
            {subtitle}
          </p>
        )}
        {actions && <div className="flex justify-center gap-4">{actions}</div>}
      </div>
    </header>
  );
};

export default Header;
