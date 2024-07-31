import React, { useState } from 'react';
import { Autocomplete,TextField,Box } from '@mui/material';

export const Autocompletar =(props)=> {

        return (            
        <Autocomplete
        id="txtAutocomplete"      
        getOptionLabel={option=>option.DESCRIPCION ? option.DESCRIPCION : ''}
        options={props.options}
        renderInput={(params) => 
        <TextField  {...params} margin="dense" size={"small"} label={props.label} error={props.error === ""}
        helperText={props.error === "" ? "Seleccione campo":'' } />}
        isOptionEqualToValue={(option, val) => option.DESCRIPCION === val.DESCRIPCION}
        onChange={(event, newValue) => props.cambiar(event,newValue)  }
        noOptionsText={"Sin resultado"}
        renderOption={(props,item)=>(
          <Box component="li" {...props} key ={item.ID}>
            {item.DESCRIPCION}
          </Box>
        )}
        />
        );
    
}


 