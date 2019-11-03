import React from 'react';
import Alert from '../components/alert';

export default { title: 'Alert' };

const openAlert = () => {
    const container = document.querySelector('.container');
    container.classList.toggle('saved');
    setTimeout(() => {
      container.classList.toggle('saved');
    }, 3000);
}

export const withJumpAnimation = () => (
    <>
        <button onClick={openAlert}>Call Alert</button>
        <Alert text="Hello!" position="40%" animation="jump" />
    </>
);

export const withEaseInOutAnimation = () => (
    <>
        <button onClick={openAlert}>Call Alert</button>
        <Alert text="Hello!" position="40%" animation="ease-in-out" />
    </>
);
