"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SimpleTooltip } from "@/components/ui/tooltip"

interface TableProps extends React.ComponentProps<"table"> {
  containerClassName?: string
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  responsiveScroll?: boolean
}

function Table({
  className,
  containerClassName,
  containerProps,
  responsiveScroll = true,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      {...containerProps}
      className={cn(
        "relative w-full",
        responsiveScroll && "overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
        containerClassName
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full min-w-full caption-bottom text-sm border-collapse text-left",
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "border-b border-border/80 bg-muted/40 text-xs font-semibold text-muted-foreground",
        "[&_tr]:border-b [&_tr]:border-border/80",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0 divide-y divide-border/40", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border bg-muted/50 font-medium text-foreground [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border/60 transition-colors duration-150",
        "hover:bg-muted/50 data-[state=selected]:bg-muted/70",
        className
      )}
      {...props}
    />
  )
}

interface TableHeadProps extends React.ComponentProps<"th"> {
  truncate?: boolean
  maxWidth?: string
  autoTitle?: boolean
}

function TableHead({
  className,
  truncate = false,
  maxWidth,
  autoTitle = true,
  title,
  children,
  style,
  ...props
}: TableHeadProps) {
  const computedTitle =
    title ||
    (autoTitle && (truncate || maxWidth) && typeof children === "string"
      ? children
      : undefined)

  return (
    <th
      data-slot="table-head"
      title={computedTitle}
      style={{ ...(maxWidth ? { maxWidth } : {}), ...style }}
      className={cn(
        "h-10 px-3.5 py-2.5 text-left align-middle font-semibold text-xs tracking-wider text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        truncate && "truncate max-w-[200px] overflow-hidden text-ellipsis",
        maxWidth && "overflow-hidden text-ellipsis",
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

interface TableCellProps extends React.ComponentProps<"td"> {
  /** Truncate long text on a single line with ellipsis */
  truncate?: boolean
  /** Maximum width for truncation constraint (e.g. '200px', '16rem') */
  maxWidth?: string
  /** Clamp text to 1, 2, or 3 lines */
  clamp?: 1 | 2 | 3
  /** Custom rich tooltip content when hovered */
  tooltip?: React.ReactNode
  /** Automatically use string children as standard HTML title hover preview */
  autoTitle?: boolean
}

function TableCell({
  className,
  truncate = false,
  maxWidth,
  clamp,
  tooltip,
  autoTitle = true,
  title,
  children,
  style,
  ...props
}: TableCellProps) {
  // Infer HTML title from string/number children if not explicitly provided
  const stringContent =
    typeof children === "string" || typeof children === "number"
      ? String(children)
      : undefined

  const computedTitle =
    title || (autoTitle && (truncate || clamp || maxWidth) ? stringContent : undefined)

  const cellContent = (
    <td
      data-slot="table-cell"
      title={computedTitle}
      style={{ ...(maxWidth ? { maxWidth } : {}), ...style }}
      className={cn(
        "p-3.5 align-middle text-sm [&:has([role=checkbox])]:pr-0",
        !clamp && "whitespace-nowrap",
        truncate && "truncate max-w-[220px] md:max-w-[320px] overflow-hidden text-ellipsis",
        clamp === 1 && "line-clamp-1 break-words whitespace-normal overflow-hidden",
        clamp === 2 && "line-clamp-2 break-words whitespace-normal overflow-hidden",
        clamp === 3 && "line-clamp-3 break-words whitespace-normal overflow-hidden",
        maxWidth && "overflow-hidden text-ellipsis",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )

  if (tooltip) {
    return (
      <SimpleTooltip content={tooltip}>
        {cellContent}
      </SimpleTooltip>
    )
  }

  return cellContent
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Truncated text wrapper for use inside compound table cell layouts
 */
interface TableTruncatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string | number
  maxWidth?: string
  clamp?: 1 | 2 | 3
  tooltip?: React.ReactNode
  autoTitle?: boolean
  children?: React.ReactNode
}

function TableTruncatedText({
  text,
  maxWidth,
  clamp,
  tooltip,
  autoTitle = true,
  title,
  className,
  style,
  children,
  ...props
}: TableTruncatedTextProps) {
  const content = children ?? text
  const stringContent = typeof content === "string" || typeof content === "number" ? String(content) : undefined
  const computedTitle = title || (autoTitle ? stringContent : undefined)

  const spanElement = (
    <span
      data-slot="table-truncated-text"
      title={computedTitle}
      style={{ ...(maxWidth ? { maxWidth } : {}), ...style }}
      className={cn(
        "inline-block",
        !clamp && "truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-[300px]",
        clamp === 1 && "line-clamp-1 break-words whitespace-normal",
        clamp === 2 && "line-clamp-2 break-words whitespace-normal",
        clamp === 3 && "line-clamp-3 break-words whitespace-normal",
        className
      )}
      {...props}
    >
      {content}
    </span>
  )

  if (tooltip) {
    return <SimpleTooltip content={tooltip}>{spanElement}</SimpleTooltip>
  }

  return spanElement
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableTruncatedText,
}
