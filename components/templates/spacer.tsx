type SpacerProps = {
  children: JSX.Element;
  styles?: String;
};

export default function Spacer({ children, styles }: SpacerProps) {
  return <div className={`mb-2 ${styles ? styles : ''}`}>{children}</div>;
}
