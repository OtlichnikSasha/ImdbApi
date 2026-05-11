import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '@shared/assets/icons/arrow-left.svg?react';

interface Props {
  url?: string;
  title?: string;
  className?: string;
}

export const BackButton = ({ className, title, url }: Props) => {
  const navigate = useNavigate();

  const classNames = clsx(
    'inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text',
    className,
  );

  const backButtonContent = (
    <>
      <div className="size-10 min-w-10 min-h-10 flex items-center justify-center rounded-[50%] border-border shadow-lg backdrop-blur">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
      </div>

      {title && <span className="text-lg">{title}</span>}
    </>
  );

  if (url) {
    return (
      <Link className={classNames} to={url}>
        {backButtonContent}
      </Link>
    );
  }

  return (
    <div className={classNames} role="button" onClick={() => void navigate(-1)}>
      {backButtonContent}
    </div>
  );
};
