import React from 'react';
import {Typography , Button , Avatar , Container , Grid , Box , Link} from "@mui/material";
import {
    SiReact ,
    SiSwift ,
    SiSymfony ,
    SiNodedotjs ,
    SiPython ,
    SiBootstrap ,
    SiHtml5 ,

} from 'react-icons/si';
import {RiTeamFill} from 'react-icons/ri';
import {saveAs} from 'file-saver';

import {Link as ScrollLink} from 'react-scroll';

const About = () => {

    const downloadCV = () => {
        saveAs ( '/assets/document/resumeJeromeGreder.pdf' , 'resume-jerome-alexandre-greder.pdf' );
    };

    return (
        <Container id='about' maxWidth={false} sx={{ paddingTop : 6 , paddingBottom : 6 }}>
            <Container>
                <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography variant="h4" align={'center'}>
                            <strong>About myself...</strong>
                        </Typography>
                        <Typography variant="body1" align={'center'} sx={{ marginTop : 4 }}>
                            I was born in Basel, Switzerland in 1998 and raised in France since then<br/>
                            I'm a huge fan of Star Trek and Star Wars universes and all that is sci-fi.<br/>
                            I love to travel especially by train it has some incredible <br/>
                            seeing the views passing by at 200km/h.<br/>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ marginTop : 4 }}>
                            <Avatar src='/assets/images/avatar.jpg'
                                    sx={{ width : 285 , height : 285 , marginTop : 8 , marginBottom : 8 }}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" align={'center'}>
                            <strong>The beginning of a journey...</strong>
                        </Typography>
                        <Typography variant="body1" align={'center'} sx={{ marginTop : 4 }}>
                            In November 2021 I started a new journey by entering the <strong><Link
                            href={'https://www.webacademie.org/'} underline={'always'} target="_blank"
                            rel="noopener">Web@academie</Link></strong> by Epitech <br/>
                            Where I learn to become a web developer in just under two years. <br/>
                        </Typography>
                        <Typography variant="body1" align={'center'} sx={{ marginTop : 4 }}>
                            In the Web@academie I learned to code in many languages, frameworks, and technologies.<br/>
                            Like this portfolio that runs on <strong>React</strong>, <strong>MUI
                            5</strong> and <strong>hostingService</strong> as a hosting service.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ marginTop : 8 , marginBottom : 8 }}>
                            <SiSwift size={35} style={{ marginLeft : 20 , marginRight : 20 , }} title={'Swift'}/>
                            <SiNodedotjs size={40} style={{ marginLeft : 20 , marginRight : 20 , }} title={'Nodejs'}/>
                            <SiSymfony size={60} style={{ marginLeft : 20 , marginRight : 20 , }} title={'Symfony'}/>
                            <SiReact size={70} style={{ marginLeft : 20 , marginRight : 20 }} title={'React'}/>
                            <SiHtml5 size={60} style={{ marginLeft : 20 , marginRight : 20 }}
                                          title={'Html'}/>
                            <SiPython size={40} style={{ marginLeft : 20 , marginRight : 20 , }} title={'Python'}/>
                            <SiBootstrap size={35} style={{ marginLeft : 20 , marginRight : 20 , }}
                                         title={'Bootstrap'}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" align={'center'} sx={{ marginTop : 4 }}>
                            In <strong><Link href={'https://www.epitech.eu/fr/ecole-informatique-mulhouse/'}
                                             target={'_blank'} rel={'noopener'}>Epitech Mulhouse</Link></strong> I've
                            also learned to manage and lead teams from different walks of
                            life <br/>
                            on different projects ranging in complexity. <br/>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box>
                            <RiTeamFill size={70} style={{ marginTop : 25 , marginBottom : 25 }}
                                        title={'Team Work'}/>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" align={'center'}>
                            I'm currently looking for a alternation job in order to gain more expression <br/>
                            And to validate my second year in the Web@academie. <br/>
                            if you want to know more about me you can download my resume down below <br/>
                            Or you can contact me if you want to work with me <br/>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={downloadCV} color={'primary'} variant={"outlined"}
                                sx={{ margin : 2 , marginTop : 4 }}>Download
                            resume</Button>
                        <Button color={'primary'} variant={"outlined"} sx={{ margin : 2 , marginTop : 4 }}>
                            <ScrollLink to="contact" smooth={true} duration={1000}>Contact me</ScrollLink></Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" align={'center'} sx={{ marginTop : 4 }}>
                            Do you got LinkedIn ? <br/>
                            Let's connect ! <br/>
                            <Link href={'https://www.linkedin.com/in/j%C3%A9r%C3%B4me-alexandre-greder-35a39b232/'} target={'_blank'} underline={'always'} rel={'noopener'}><strong>my LinkedIn profile</strong></Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
export default About;