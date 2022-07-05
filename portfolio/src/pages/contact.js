import React from 'react';
import {Container , Typography , Button , TextField} from "@mui/material";
import emailjs from 'emailjs-com';

const contact = () => {

    function sendMessage(e) {
        e.preventDefault ();
        emailjs.sendForm ( 'service_kjci7se' , 'template_wstgvgg' , e.target , 'xEUk5SzOyHzebv3S5' )
            .then ( res => {
                console.log ( res.text );
            } )
            .catch ( err => {
                    console.log ( err.text );
                }
            );
    }

    return (
        <Container id='contact' sx={{ paddingTop : 6 , paddingBottom : 6 }} maxWidth={false}>
            <Container>
                <Typography variant="h4" align={'center'}>
                   <strong>Contact</strong>
                </Typography>
                <Typography variant="subtitle1" align={'center'} sx={{ marginTop : 2 }}>
                    Any questions? <br/>
                    Or do you want to work together? <br/>
                    Feel free to contact me!
                </Typography>
                <Container sx={{ marginTop : 2 }} maxWidth={'xs'}>
                    <form noValidate={true} onSubmit={sendMessage}>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            name={'name'}
                            variant="standard"
                            fullWidth={true}
                            helperText={'First name and last name'}
                            required={true}
                            sx={{ marginTop : 2 , marginBottom : 2 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            name={'email'}
                            type="email"
                            variant="standard"
                            required={true}
                            fullWidth={true}
                            sx={{ marginTop : 2 , marginBottom : 2 }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Message"
                            name={'message'}
                            variant="standard"
                            multiline={true}
                            type={'text'}
                            rows={4}
                            required={true}
                            fullWidth={true}
                            placeholder={'May the force be with you'}
                            sx={{ marginTop : 2 , marginBottom : 2 }}
                        />

                        <Button type={'submit'} name={'submit'} variant={"outlined"} color={'primary'}>
                            send
                        </Button>
                    </form>
                </Container>
            </Container>
        </Container>
    );
}
export default contact;