import { InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const BigInput = ({ ...rest }: InputProps) => {
  return (
    <input
      className="rounded-[1px] h-[44px] p-0 pb-1 text-lg border-b-2 border-gray-300 text-[26px] outline-none focus:border-red-300 transition-all duration-150"
      style={{
        color: '#1f2937',
        caretColor: '#f87171',
        lineHeight: 1.15,
      }}
      {...rest}
    />
  );
};
