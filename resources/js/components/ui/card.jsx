import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card — Container base para agrupamento de conteúdo em formato de cartão.
 * @param {string} [className] - Classes CSS adicionais.
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props} />
))
Card.displayName = "Card"

/**
 * CardHeader — Cabeçalho do cartão, geralmente contendo Título e Descrição.
 * @param {string} [className] - Classes CSS adicionais.
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle — Título principal do cartão.
 * @param {string} [className] - Classes CSS adicionais.
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription — Texto de descrição secundária do cartão.
 * @param {string} [className] - Classes CSS adicionais.
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent — Container principal para o corpo/conteúdo do cartão.
 * @param {string} [className] - Classes CSS adicionais.
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter — Rodapé do cartão, geralmente usado para botões de ação.
 * @param {string} [className] - Classes CSS adicionais.
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
