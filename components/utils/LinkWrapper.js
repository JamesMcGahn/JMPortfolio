import React from 'react';
import Link from 'next/link'

function LinkWrapper(props) {
    const to = props.to
    return (
        <Link href={to} passHref>
            <a>
                {props.children}
            </a>
        </Link>
    );
}

export default LinkWrapper;