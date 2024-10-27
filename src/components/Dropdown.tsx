import { forwardRef } from "react";

interface IProps {
  children: JSX.Element;
  floatingStyles: React.CSSProperties;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
}

const Dropdown = forwardRef(
  (
    { children, floatingStyles, getFloatingProps }: IProps,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    return (
      <div
        ref={ref}
        style={floatingStyles}
        className="min-w-80 rounded p-2 border bg-gray-200 border-slate-400 dark:bg-slate-700"
        {...getFloatingProps()}
      >
        {children}
      </div>
    );
  }
);

export default Dropdown;
