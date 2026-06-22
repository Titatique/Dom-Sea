import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
            {required && (
              <span className="text-[var(--color-beacon)] ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            "w-full px-3 py-2 text-sm bg-white border rounded",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-foreground)] placeholder:text-[var(--color-channel)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-beacon)] focus:border-[var(--color-beacon)]",
            "transition-colors duration-150",
            error && "border-[var(--color-danger)] focus:ring-[var(--color-danger)]",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[var(--color-channel)]">
            {hint}
          </p>
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-[var(--color-danger)] font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, required, id, ...props }, ref) => {
    const textareaId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
            {required && (
              <span className="text-[var(--color-beacon)] ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            "w-full px-3 py-2 text-sm bg-white border rounded resize-y min-h-[100px]",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-foreground)] placeholder:text-[var(--color-channel)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-beacon)] focus:border-[var(--color-beacon)]",
            "transition-colors duration-150",
            error && "border-[var(--color-danger)]",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-[var(--color-channel)]">{hint}</p>
        )}
        {error && (
          <p role="alert" className="text-xs text-[var(--color-danger)] font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, required, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium">
            {label}
            {required && (
              <span className="text-[var(--color-beacon)] ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            "w-full px-3 py-2 text-sm bg-white border rounded appearance-none",
            "border-[var(--color-border-subtle)]",
            "text-[var(--color-foreground)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-beacon)] focus:border-[var(--color-beacon)]",
            error && "border-[var(--color-danger)]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p role="alert" className="text-xs text-[var(--color-danger)] font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select };
