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
    default:
      'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)]',
    dark: 'bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)]',
    gradient: 'bg-[var(--gradient-primary)] text-[var(--color-text-primary)]',
    light:
      'bg-[var(--color-bg-primary)]/20 text-[var(--color-text-primary)] border border-[var(--color-border-primary)]/30',
    glass:
      'bg-[var(--color-bg-primary)]/30 backdrop-blur-md border border-[var(--color-border-primary)]/20 text-[var(--color-text-primary)]',
  };

  return (
    <header
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="text-center max-w-3xl mx-auto">
        <Title
          contents={title}
          className="font-semibold mb-4 leading-tight"
        />
        {subtitle && (
          <p className="text-t-primary text-lg md:text-xl opacity-80 mb-6 ">
            {subtitle}
          </p>
        )}
        {actions && <div className="flex justify-center gap-4">{actions}</div>}
      </div>
    </header>
  );
};

export default Header;
