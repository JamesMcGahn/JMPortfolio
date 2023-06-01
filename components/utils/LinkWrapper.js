import React from "react";
import Link from "next/link";

function LinkWrapper(props) {
  const to = props.to;
  return <Link href={to}>{props.children}</Link>;
}

export default LinkWrapper;
