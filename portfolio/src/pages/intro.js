import React from 'react';
import {Typography , Container , Grid , Button} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Link} from 'react-scroll';

const Intro = () => {

    return (
        <Container maxWidth={false} id='home'
                   sx={{ paddingTop : 6 , paddingBottom : 6 , bgcolor : grey['900'] , color : grey['50'] }}>
            <Container>
                <Grid container spacing={0} direction='row' alignItems='center' justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography variant="h4" align={'center'}>
                            <strong>Jérôme Greder Web Portfolio</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align={'center'} sx={{ marginTop : 2 }}>
                            make it pop!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'} align={'center'} sx={{ marginTop : 4 }}>
                            Hello there, my name is Jérôme Greder and I welcome you to my web portfolio. <br/>
                            I am a student at the Web@academie by Epitech Mulhouse, France. <br/>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'body1'} align={'center'} sx={{ marginTop : 2 }}>
                            Do you want to checkout my works? <br/>
                            You can view them in the projects section of the porfolio <br/>
                            <Button color={'inherit'} variant={"outlined"} sx={{ marginTop : 3 }}>
                                <Link to="projects" smooth={true} duration={1000}>Projects</Link>
                            </Button>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'body1'} align={'center'} sx={{ marginTop : 3 }}>
                            this portfolio was created for studies here at Epitech Mulhouse, <br/>
                            but also the exhibition of my know-how and the projects I made.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
export default Intro;