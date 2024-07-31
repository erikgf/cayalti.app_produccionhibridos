import { MdVisibility as Visibility, MdVisibilityOff as VisibilityOff } from 'react-icons/md'; 
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

export const PasswordField = (props)=>  {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      color='success'
      sx={{ width: 250}}       
      margin="normal"
      
      variant="outlined"
      id={'txtPassword'}
      label={'Contraseña'}
      type={showPassword ? 'text' : 'password'}
      inputProps={{ minLength: 6 }}
      required
      onChange={props.onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};