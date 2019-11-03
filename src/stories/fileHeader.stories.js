import React from 'react';
import FileHeader from '../components/fileHeader';

export default { title: 'File Header' };

export const withLightTheme = () => <FileHeader theme="light">New File</FileHeader>;

export const withDarkTheme = () => <FileHeader theme="dark">New File</FileHeader>; 
