import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/legacy/image';
import classes from '../../styles/Hero.module.css';

interface Props {
  h1: string;
  h2: string;
}

function Hero({ h1, h2 }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.heroCont}>
      <Container className={loading ? classes.hero : classes.heroLoading} fluid>
        <h1 id={classes.h1}>{h1}</h1>
        <h2 id={classes.h2}>{h2}</h2>
        <Image
          src="/img/jmlogo4.jpg"
          alt="hero"
          layout="fill"
          quality="100"
          objectFit="cover"
          priority
          onLoadingComplete={() => setLoading(true)}
        />
        <div className={classes.chevron}>
          <a href="#about">
            <FontAwesomeIcon icon={faChevronDown} />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
