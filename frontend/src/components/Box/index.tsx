type BoxProps = {
    children: React.ReactNode
    className?: string
  }
  
  export const Box = ({ children, className }: BoxProps) => {
    return (
      <div
        className={`max-h-fit  rounded-xl flex flex-col p-8 ${className}`}
      >
        {children}
      </div>
    )
  }
  