import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = forwardRef(
  (
    {
      name,
      value,
      defaultValue,
      onChange,
      placeholder = 'Type here...',
      maxLength = 500,
      className = '',
      showCounter = true,
      register,
      minRows = 2,
      maxRows = 8,
      label,
      helperText,
      error,
      required,
      disabled,
      readOnly,
      showClear = false,
      onClear,
      suffix,
      prefix,
      id,
      counterPosition = 'right',
      trimOnBlur = false,
      ...props
    },
    ref
  ) => {
    const innerId = useId();
    const textareaId = id || `${innerId}-${name}`;
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current);

    const currentLength = (
      value ??
      defaultValue ??
      props.value ??
      ''
    ).toString().length;

    const handleClear = () => {
      if (onClear) return onClear();
      const fakeEvent = { target: { value: '' } };
      onChange?.(fakeEvent);
      if (localRef.current && !value) {
        localRef.current.value = '';
      }
      localRef.current?.focus();
    };

    const handleBlur = (e) => {
      if (trimOnBlur) {
        const trimmed = e.target.value.trim();
        if (onChange && trimmed !== e.target.value) {
          const fakeEvent = { target: { value: trimmed } };
          onChange(fakeEvent);
        }
        if (!onChange && localRef.current) {
          localRef.current.value = trimmed;
        }
      }

      if (props.onBlur) props.onBlur(e);
    };

    const describedByIds = [];
    if (helperText) describedByIds.push(`${textareaId}-helper`);
    if (error) describedByIds.push(`${textareaId}-error`);
    if (showCounter && counterPosition === 'bottom')
      describedByIds.push(`${textareaId}-counter`);

    // Animation variants
    const containerVariants = {
      initial: { opacity: 0, y: 10 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      },
    };

    const errorVariants = {
      initial: { opacity: 0, scale: 0.95, y: -5 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -5,
        transition: {
          duration: 0.15,
        },
      },
    };

    const clearButtonVariants = {
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.2,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.15,
        },
      },
      hover: {
        scale: 1.1,
        transition: {
          duration: 0.1,
        },
      },
      tap: {
        scale: 0.9,
      },
    };

    return (
      <motion.div
        className={`min-w-full ${className} bg-white/8 p-4 rounded-xl`}
        variants={containerVariants}
        initial="initial"
        animate="animate">
        <AnimatePresence mode="wait">
          {label && (
            <motion.label
              htmlFor={textareaId}
              className="block mb-1.5 text-sm font-semibold text-white"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}>
              {label}
              {required && (
                <motion.span
                  className="text-red-400 ml-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}>
                  *
                </motion.span>
              )}
            </motion.label>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-2">
          <AnimatePresence>
            {prefix && (
              <motion.div
                className="mt-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}>
                {prefix}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <motion.div
              className="relative"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}>
              <TextareaAutosize
                id={textareaId}
                name={name}
                maxLength={maxLength}
                minRows={minRows}
                maxRows={maxRows}
                placeholder={placeholder}
                ref={(node) => {
                  localRef.current = node;
                  if (typeof ref === 'function') ref(node);
                  else if (ref) ref.current = node;
                }}
                value={value}
                defaultValue={defaultValue}
                onChange={(e) => {
                  if (disabled || readOnly) return;
                  if (onChange) onChange(e);
                  if (props.onChange) props.onChange(e);
                }}
                onBlur={handleBlur}
                aria-invalid={!!error}
                aria-describedby={describedByIds.join(' ') || undefined}
                className={`
                  w-full text-sm leading-relaxed px-3 py-2.5 rounded-xl
                  resize-none box-border transition-all duration-200
                  ${
                    disabled
                      ? 'bg-white/5 text-gray-400 cursor-not-allowed border-white/10'
                      : 'bg-white/5 text-white border-white/20 hover:bg-white/10 focus:bg-white/10'
                  }
                  ${
                    error
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500/20'
                      : 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20'
                  }
                  placeholder-gray-400 
                `}
                disabled={disabled}
                readOnly={readOnly}
                {...(register ? register(name) : {})}
                {...props}
              />
            </motion.div>

            <div className="flex justify-between items-center">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {helperText && !error && (
                    <motion.div
                      id={`${textareaId}-helper`}
                      className="text-xs text-gray-400 mt-1.5"
                      variants={errorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      key="helper">
                      {helperText}
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      id={`${textareaId}-error`}
                      className="text-xs text-red-400 mt-1.5 font-medium"
                      variants={errorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      key="error">
                      {typeof error === 'string' ? error : 'There is an error.'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showCounter && counterPosition === 'right' && (
                  <motion.div
                    id={`${textareaId}-counter`}
                    className={`text-xs ml-3 transition-colors duration-200 ${
                      currentLength >= maxLength * 0.9
                        ? 'text-yellow-400'
                        : currentLength >= maxLength
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}>
                    {currentLength}/{maxLength}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showCounter && counterPosition === 'bottom' && (
                <motion.div
                  id={`${textareaId}-counter`}
                  className={`mt-1.5 text-xs transition-colors duration-200 ${
                    currentLength >= maxLength * 0.9
                      ? 'text-yellow-400'
                      : currentLength >= maxLength
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}>
                  {currentLength}/{maxLength}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showClear && !disabled && !readOnly && currentLength > 0 && (
              <motion.div
                className="flex items-center"
                variants={clearButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit">
                <motion.button
                  type="button"
                  aria-label="Clear text"
                  onClick={handleClear}
                  variants={clearButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="
                    cursor-pointer border-none bg-transparent p-1.5 text-sm
                    text-gray-400 hover:text-red-400 rounded-lg
                    hover:bg-red-500/10 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-red-500/20
                  ">
                  ✕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {suffix && (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}>
                {suffix}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
