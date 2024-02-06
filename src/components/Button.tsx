import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}>;

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button className="bg-blue-500 px-5 py-2 rounded text-white" {...rest}>
      {children}
    </button>
  );
};
