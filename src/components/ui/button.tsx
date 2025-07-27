import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900 active:bg-gray-950",
        primary:
          "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-600 active:bg-purple-800",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-300 active:bg-gray-300",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-300 active:bg-gray-100",
        ghost:
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300 active:bg-gray-200",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 active:bg-red-800",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600 active:bg-green-800",
        warning:
          "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500 active:bg-amber-700",
        link: 
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 focus-visible:ring-blue-600",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-md",
        default: "h-10 px-4 py-2.5 text-sm rounded-lg",
        lg: "h-12 px-6 py-3 text-base rounded-lg",
        xl: "h-14 px-8 py-4 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), "rounded-none")}
      {...props}
    />
  )
}

export { Button, buttonVariants }
