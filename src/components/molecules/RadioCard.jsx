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
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 bg-white/5'
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
      <Icon className="w-4 h-4 mr-2 text-purple-400" />
      <span className="text-white text-sm">{label}</span>
    </label>
  );
};

export default RadioCard;
