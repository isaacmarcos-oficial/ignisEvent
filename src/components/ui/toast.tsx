import * as React from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "nfixed ntop-0 nz-[100] nflex nmax-h-screen nw-full nflex-col-reverse np-4 sm:nbottom-0 sm:nright-0 sm:ntop-auto sm:nflex-col md:nmax-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "ngroup npointer-events-auto nrelative nflex nw-full nitems-center njustify-between nspace-x-2 noverflow-hidden nrounded-md nborder np-4 npr-6 nshadow-lg ntransition-all data-[swipe=cancel]:ntranslate-x-0 data-[swipe=end]:ntranslate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ntranslate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ntransition-none data-[state=open]:nanimate-in data-[state=closed]:nanimate-out data-[swipe=end]:nanimate-out data-[state=closed]:nfade-out-80 data-[state=closed]:nslide-out-to-right-full data-[state=open]:nslide-in-from-top-full data-[state=open]:sm:nslide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "nborder nbg-background ntext-foreground",
        destructive:
          "ndestructive ngroup nborder-destructive nbg-destructive ntext-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "ninline-flex nh-8 nshrink-0 nitems-center njustify-center nrounded-md nborder nbg-transparent npx-3 ntext-sm nfont-medium ntransition-colors hover:nbg-secondary focus:noutline-none focus:nring-1 focus:nring-ring disabled:npointer-events-none disabled:nopacity-50 group-[.destructive]:nborder-muted/40 group-[.destructive]:hover:nborder-destructive/30 group-[.destructive]:hover:nbg-destructive group-[.destructive]:hover:ntext-destructive-foreground group-[.destructive]:focus:nring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "nabsolute nright-1 ntop-1 nrounded-md np-1 ntext-foreground/50 nopacity-0 ntransition-opacity hover:ntext-foreground focus:nopacity-100 focus:noutline-none focus:nring-1 group-hover:nopacity-100 group-[.destructive]:ntext-red-300 group-[.destructive]:hover:ntext-red-50 group-[.destructive]:focus:nring-red-400 group-[.destructive]:focus:nring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross2Icon className="nh-4 nw-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("ntext-sm nfont-semibold [&+div]:ntext-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("ntext-sm nopacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
