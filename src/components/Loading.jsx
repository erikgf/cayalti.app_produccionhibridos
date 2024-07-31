import { Backdrop, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export const Loading = ({label, open}) => {
  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }}/>
      <Typography sx={{ color: 'white' }}>{label}</Typography>
    </Backdrop>
  );
};