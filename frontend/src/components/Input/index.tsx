import { Field, FieldProps } from 'formik'
import { ChangeEvent, useRef } from 'react'

export type InputProps = {
  label?: string
  onChange?: (e: any) => void
  icon?: any
  variant?: 'inputPrimary'
  name: string
  className?: string
  containerClassName?: string
  onClickIcon?: () => void
  
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({
  label,
  onChange,
  variant = 'inputPrimary',
  icon: Icon,
  name,
  className,
  containerClassName,
  type = 'text',
  onClickIcon,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    if (typeof window !== 'object') return

    inputRef.current?.scroll
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const showError = !!meta.error && meta.touched
        return (
          <div
            className={`flex flex-col gap-2 text-bgLoginPage w-full ${
              containerClassName || ''
            }`}
          >
            {label && <label htmlFor={rest.id}>{label}</label>}

            <div
              className={`flex text-sm text-inherit border bg-white border-bgLoginPage rounded focus:outline-none ${
                Icon ? 'gap-2 items-center' : ''
              } ${showError ? '!border-red-300' : ''} ${className || ''}`}
            >
              {Icon && (
                <Icon
                  onClick={onClickIcon}
                  className={onClickIcon ? 'cursor-pointer' : ''}
                  size={24}
                  color="#49454f"
                />
              )}
              <input
                onClick={handleClick}
                ref={inputRef}
                name={name}
                {...rest}
                {...meta}
                {...(field as any)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e)
                  onChange && onChange(e)
                }}
                type={type}
                className={`flex-1 text-inherit py-2 px-4 w-full h-[56px] focus:outline-none ${
                  rest.disabled
                    ? 'bg-opacity-50 cursor-not-allowed'
                    : 'bg-transparent'
                } ${showError ? 'placeholder:text-red-300' : ''} break-words ${
                  variant ? 'placeholder:text-grayPrimary' : ''
                }`}
                data-testid="input"
              />
            </div>
            {showError && (
              <span className="text-xs text-red-300 -my-1 ml-2">
                {meta.error}
              </span>
            )}
          </div>
        )
      }}
    </Field>
  )
}