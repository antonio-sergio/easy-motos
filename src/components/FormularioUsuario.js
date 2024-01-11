import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import userService from '../services/user/user-service';
import { ToastContainer, toast } from 'react-toastify';

const UserForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        role: '',
        setor: '',
        telasPermitidas: 'listas'
    });
    const [added, setAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    const handleChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };



    const resetForm = () => {
        setUser({
            name: '',
            email: '',
            password: '',
            image: '',
            role: '',
            setor: '',
            telasPermitidas: 'listas'
        });
        setAdded(true);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        user.image = selectedImage;
        userService.create(user).then(response => {
            if (response.status === 201) {
                toast.success('Usuário criado com sucesso!');
                resetForm();
            }
        }).catch(error => {
            console.log(error);
            toast.error('Não foi possível adicionar o usuário!')
        })
    };


    const isEmailValid = (email) => {
        // Expressão regular para validar o formato do email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };




    return (
        <div style={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
            <ToastContainer />
            {added === false ? <form onSubmit={handleSubmit}>
                <Grid container sx={{ justifyContent: 'center', overflow: 'auto' }} spacing={2}>

                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} marginTop={4}>

                        <TextField
                            label="Nome"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            color='warning'
                        />
                    </Grid>

                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} marginTop={4}>
                        <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={user.email && !isEmailValid(user.email)}
                            helperText={user.email && !isEmailValid(user.email) ? 'Email inválido' : ''}
                            color='warning'
                        />
                    </Grid>



                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} marginTop={4}>
                        <TextField
                            label="Img"
                            name="image"
                            type='file'
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            fullWidth
                            color='warning'
                        />
                    </Grid>

                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} marginTop={4}>
                        <TextField
                            label="Senha"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            fullWidth
                            color='warning'
                        />
                    </Grid>
                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} >
                        <FormControl fullWidth margin="normal">
                            <InputLabel color='warning' id="role">Acesso</InputLabel>
                            <Select
                                label="Acesso"
                                labelId="role"
                                id='role'
                                name='role'
                                onChange={(e) => setUser((prevUser) => ({
                                    ...prevUser,
                                    [e.target.name]: e.target.value,
                                }))}
                                color='warning'

                            >
                                <MenuItem value="user">
                                    User
                                </MenuItem>
                                <MenuItem value="admin">
                                    Admin
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item m={2} xs={12} sm={6} md={4} lg={3} >
                        <FormControl fullWidth margin="normal">
                            <InputLabel color='warning' id="setor">Setor</InputLabel>
                            <Select
                                label="Setor"
                                labelId="setor"
                                id='setor'
                                name='setor'
                                onChange={(e) => setUser((prevUser) => ({
                                    ...prevUser,
                                    [e.target.name]: e.target.value,
                                }))}
                                color='warning'

                            >
                                <MenuItem value="liberação">
                                    Liberação
                                </MenuItem>
                                <MenuItem value="importação">
                                    Importação
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>




                    <Grid item m={2} xs={6} sm={5} md={4} lg={3} marginTop={4}>
                        <Button sx={{ height: 53 }} type="submit" variant="contained" color="warning" fullWidth>
                            adicionar
                        </Button>
                    </Grid>
                </Grid>
            </form> : <Grid
                container
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 450px)',
                }}
            >
                <Grid item m={2} xs={6} sm={5} md={4} lg={3}>
                    <Button
                        sx={{ height: 53 }}
                        type="button"
                        onClick={() => setAdded(false)}
                        variant="contained"
                        color="warning"
                        fullWidth
                    >
                        adicionar novo usuário
                    </Button>
                </Grid>
            </Grid>}
        </div >
    );
};

export default UserForm;
