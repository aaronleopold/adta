import React from 'react';

interface HeadingProps extends React.ComponentProps<'h3'> {}

const Heading: React.FC<HeadingProps> = ({ ...props }) => {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h3 className="font-medium text-lg tracking-wide" {...props} />;
};

export default Heading;
