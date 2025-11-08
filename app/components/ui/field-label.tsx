import * as React from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  label: string;
  required?: boolean;
  showIndicator?: boolean; // Allow hiding the optional indicator if needed
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FieldLabelProps
>(({ label, required = false, showIndicator = true, className, ...props }, ref) => {
  return (
    <Label ref={ref} className={cn(className)} {...props}>
      {label}
      {showIndicator && !required && (
        <span className="ml-1 text-xs font-normal text-muted-foreground">
          (Optional)
        </span>
      )}
    </Label>
  );
});

FieldLabel.displayName = "FieldLabel";

export { FieldLabel };
