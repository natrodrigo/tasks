import { forwardRef } from "react";

interface IProps {
  children: JSX.Element;
  floatingStyles: React.CSSProperties;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
}

const Dropdown = forwardRef(
  (
    { children, floatingStyles, getFloatingProps }: IProps,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    return (
      <div ref={ref} style={floatingStyles} className="min-w-80 bg-slate-600 border border-slate-500 rounded p-2" {...getFloatingProps()}>
        {children}
      </div>
    );
  }
);

export default Dropdown;
