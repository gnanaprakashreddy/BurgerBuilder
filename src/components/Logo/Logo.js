import React from 'react';
import LogoPic from '../../../src/assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <img className = {classes.Logo} src = {LogoPic} alt="My Burger"/>
)

export default Logo;