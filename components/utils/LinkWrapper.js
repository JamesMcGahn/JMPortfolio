import React from 'react';
import Link from 'next/link';

function LinkWrapper({ to, children }) {
  return <Link href={to}>{children}</Link>;
}

export default LinkWrapper;
