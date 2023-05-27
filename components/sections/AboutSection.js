import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import classes from '../../styles/aboutSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faHtml5, faCss3, faJsSquare, faBootstrap, faNode, faPython } from '@fortawesome/free-brands-svg-icons';
function AboutSection(props) {
  return (
    <Container className={classes.outerContainer} id="about" fluid>
      <div className={classes.header}>
        <h2>About.</h2>
      </div>
      <Container className={classes.container} fluid>
        <Card className={classes.card}>
          <Card.Body>
            <Row>
              <Col xs={12} md={5} className={classes.bio}>
                <div className={classes.bioText}>
                  <Card className={classes.innerCard}>
                    <Card.Img variant="top" src="/img/headshot.jpg" />
                    <Card.Body>
                      <span className={classes.title}>
                        <h3>James McGahn</h3>
                      </span>
                      <h5>Developer</h5>I am developer located in New Jersey.<br></br> I am interested in solving problems through code and building responsive apps to ensure excellent user
                      experiences.
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col xs={12} md={7} className={classes.rightCol}>
                <Card className={classes.innerCard}>
                  <div className={classes.skillsHeader}>
                    <h4>Skills</h4>
                  </div>
                  <div className={classes.icons}>
                    <FontAwesomeIcon icon={faReact} />
                    <FontAwesomeIcon icon={faJsSquare} />
                    <FontAwesomeIcon icon={faNode} />
                    <FontAwesomeIcon icon={faPython} />
                  </div>
                  <div className={classes.skillList}>
                    <h6>Core Skills:</h6>
                    <ul>
                      <li> HTML5, CSS3, JavaScript, React, Next.js, Material UI, Bootstrap, Python, TypeScript, </li>
                      <li> MongoDB, TailWind CSS, GraphQL, Node / Express, Liquid </li>
                    </ul>
                    <h6>I Also Have Some Experience:</h6>
                    <ul>
                      <li> PHP, PostgreSQL, MySQL, Premiere, Photoshop, Illustrator </li>
                    </ul>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default AboutSection;
