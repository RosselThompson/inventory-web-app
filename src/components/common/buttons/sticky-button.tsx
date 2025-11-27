import * as React from "react"
import { cn } from "@/lib/utils" // opcional, para combinar clases
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type StickyAddButtonProps = {
  label?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  /** Posición del botón en pantalla */
  position?:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
  /** Ajuste de distancia desde los bordes */
  offset?: {
    x?: number // px
    y?: number // px
  }
  /** Mostrar sólo el ícono en pantallas pequeñas */
  iconOnlyOnMobile?: boolean
  /** aria-label cuando sea icon-only */
  ariaLabel?: string
}

export function StickyAddButton({
  label = "New",
  onClick,
  disabled,
  className,
  position = "bottom-right",
  offset = { x: 16, y: 16 },
  iconOnlyOnMobile = true,
  ariaLabel = "new",
}: StickyAddButtonProps) {
  const posClasses = {
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
  }[position]

  const style: React.CSSProperties = {
    insetInlineStart: undefined,
    insetInlineEnd: undefined,
    margin: 0,
    transform: `translate(${
      position.includes("right") ? `-${offset.x}px` : `${offset.x}px`
    }, ${
      position.includes("bottom") ? `-${offset.y}px` : `${offset.y}px`
    })`,
  }

  return (
    <div
      className={cn(
        "fixed z-50 pointer-events-none",
        posClasses,
        className
      )}
      style={style}
    >
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "pointer-events-auto rounded-full shadow-lg",
          "h-12 px-5 md:h-12 md:px-6",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "focus-visible:ring-2 focus-visible:ring-primary/40",
          "transition-transform active:scale-95"
        )}
      >
        <span className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          <span className={iconOnlyOnMobile ? "hidden sm:inline" : "inline"}>
            {label}
          </span>
        </span>
        {iconOnlyOnMobile && (
          <span className="sr-only">{ariaLabel}</span>
        )}
      </Button>
    </div>
  )
}
