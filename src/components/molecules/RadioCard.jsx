import { FaRandom } from 'react-icons/fa';

const RadioCard = ({
  icon = FaRandom,
  label,
  value,
  selectedValue,
  onChange,
  register,
  rules = {},
  name = '',
}) => {
  const isSelected = selectedValue === value;
  const Icon = icon;

  return (
    <label
      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all 
        ${
          isSelected
            ? 'border-pink-500 bg-pink-500/10'
            : 'border-bg-glass-lg bg-bg-glass-sm'
        }
      `}>
      <input
        type="radio"
        name={name}
        checked={isSelected}
        value={register ? undefined : value || label}
        onChange={register ? undefined : onChange}
        {...(register ? register(name, rules) : {})}
        className="sr-only"
      />
      <Icon className="w-4 h-4 mr-2 text-pink-400" />
      <span className="text-t-primary text-sm">{label}</span>
    </label>
  );
};

export default RadioCard;
