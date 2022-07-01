import React from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./About.scss";


function About() {

    const popover = (
        <Popover id="popover-basic" className="about__overlay">
            <Popover.Header as="h3" className="about__title">Welcome to LiteChat~</Popover.Header>
            <Popover.Body className='about__body'>
                <p className="about__text">
                    know more or send a feedback at:
                </p>
                <div className="about__contact">
                    <a href="https://github.com/nancy-sun" target="_blank" className="about__github"></a>
                    <a href="https://www.linkedin.com/in/-nancy-sun/" target="_blank" className="about__linkedin"></a>
                    <a href="mailto:nancysnx1110@gmail.com" target="_blank" className="about__email"></a>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <button className="about"></button>
        </OverlayTrigger>
    )
}

export default About;