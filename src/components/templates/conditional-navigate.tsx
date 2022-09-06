import { Link } from 'react-router-dom';

type ConditionaNavigateProps = {
  children: JSX.Element;
  booleanCheck: boolean;
  navigateTo: string;
  state?: any;
  falseAction?: any;
};

export default function ConditionalNavigate({
  children,
  booleanCheck,
  navigateTo,
  state,
  falseAction,
}: ConditionaNavigateProps) {
  return booleanCheck ? (
    <Link to={navigateTo} state={state}>
      {children}
    </Link>
  ) : (
    <div onClick={falseAction}>{children}</div>
  );
}
