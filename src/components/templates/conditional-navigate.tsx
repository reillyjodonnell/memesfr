import { Link } from 'react-router-dom';

type ConditionaNavigateProps = {
  children: JSX.Element;
  booleanCheck: boolean;
  navigateTo: string;
  state?: any;
  falseAction?: any;
  action?: any;
};

export default function ConditionalNavigate({
  children,
  booleanCheck,
  navigateTo,
  state,
  falseAction,
  action,
}: ConditionaNavigateProps) {
  return booleanCheck ? (
    <Link onClick={action ? action : () => {}} to={navigateTo} state={state}>
      {children}
    </Link>
  ) : (
    <div onClick={falseAction}>{children}</div>
  );
}
