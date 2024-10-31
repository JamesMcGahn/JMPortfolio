import React from 'react';
import Link from 'next/link';

interface Props {
  to: string;
  children: React.ReactNode;
}

function LinkWrapper({ to, children }: Props) {
  return <Link href={to}>{children}</Link>;
}

export default LinkWrapper;
