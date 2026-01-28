import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'lg' | 'sm' // Adicionei 'size' porque a tua Home usa Button size="lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100",
      outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900",
      secondary: "bg-orange-500 text-white hover:bg-orange-600"
    }

    const sizes = {
      default: "px-6 py-3 text-sm",
      lg: "px-10 py-6 text-lg",
      sm: "px-4 py-2 text-xs"
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none disabled:opacity-50 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props} // A correção está aqui: deve ser {...props} dentro da tag
      />
    )
  }
)
Button.displayName = "Button"

export { Button }