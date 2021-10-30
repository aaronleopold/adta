import clsx from 'clsx';
import React from 'react';
import {
  BUTTONGROUP_GAPS,
  BUTTON_CIRCLE_SIZES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  FOCUS_STYLE
} from './constants';
import Loader from './Loader';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  circle?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = 'default',
  circle,
  fullWidth,
  className,
  loading,
  children,
  ...props
}: ButtonProps) {
  const variantStyle = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.default;
  const size = circle
    ? BUTTON_CIRCLE_SIZES[props.size || 'md']
    : BUTTON_SIZES[props.size || 'md'];

  const classNames = clsx(
    circle ? 'rounded-full' : 'rounded-md',
    fullWidth && 'w-full min-w-0 text-center justify-center',
    { 'opacity-5': loading },
    'shadow-sm relative inline-flex items-center border text-sm leading-5 font-medium transition-colors ease-in-out duration-200 focus:outline-none',
    variantStyle,
    FOCUS_STYLE,
    size,
    className
  );

  return (
    <button type={props.type || 'button'} className={classNames} {...props}>
      {loading ? (
        <span className="flex items-center justify-center mx-auto">
          <Loader size="sm" inline active={loading} />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

interface ButtonGroupProps extends React.ComponentProps<'div'> {
  gap?: keyof typeof BUTTONGROUP_GAPS;
}

function ButtonGroup({
  children,
  className,
  gap = 'md',
  ...props
}: ButtonGroupProps) {
  const groupStyles = BUTTONGROUP_GAPS[gap] ?? BUTTONGROUP_GAPS.md;
  return (
    <div
      className={clsx(
        groupStyles,
        'flex flex-col-reverse sm:flex-row space-y-reverse justify-end',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Button.Group = ButtonGroup;
