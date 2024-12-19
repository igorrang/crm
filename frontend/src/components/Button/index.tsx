import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode
    variant?: 'transparent' | 'primary'
}

export const Button = ({ children, variant, ...rest}: ButtonType)=> {
   return(
    <button
    {...rest}
    className={`${
      variant === 'transparent' &&
      `border border-yellowPrimary !bg-transparent rounded-full text-yellowPrimary font-bold text-base ${
        rest.className
      } hover:opacity-50 ${
        rest.disabled
          ? 'cursor-not-allowed opacity-50 !text-grayPrimary !border-grayPrimary'
          : ''
      }`
    } ${
      variant === 'primary' &&
      `border bg-yellowPrimary rounded-full text-black font-bold text-base hover:opacity-50`
    } ${
      rest.disabled ? 'cursor-not-allowed opacity-50 !bg-grayPrimary' : ''
    } ${rest.className}`}
  >
    {children}
  </button>
)
}