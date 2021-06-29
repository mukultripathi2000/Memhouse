import React from 'react'
import { TextField,Grid,InputAdornment,IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({half,name,handleChange,autoFocus,type,handleShowPassword,label}) => {
    return (
        <Grid item xs={12} sm={half?6:12}>
            <TextField
                name={name}
                variant="outlined"
                label={label}
                required
                fullWidth
                onChange={handleChange}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type==='password'?<Visibility fontSize="small" />:<VisibilityOff fontSize="small" />}
                            </IconButton>
                        </InputAdornment>
                    )
                }:null  }
                
                />
        </Grid>
    )
}

export default Input
