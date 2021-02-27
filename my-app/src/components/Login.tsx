import { Box, Button, Container, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { Context } from '../index';



const Login = () => {
    const { auth, firebase } = useContext(Context);
    const login = async () => {
        const provider = await new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
    }
    return (
        <Container>
            <Grid alignItems={"center"} justify={"center"} container style={{ height: window.innerHeight - 50 }}>
                <Grid style={{ width: 400, background: "lightgray" }}
                    container alignItems={"center"} justify={"center"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant={"outlined"}>Войти с помощью Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;