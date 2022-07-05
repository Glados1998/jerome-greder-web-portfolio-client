import React from 'react';
import {
    Container ,
    Grid ,
    Typography ,
    Link ,
    Card ,
    CardContent ,
    CardHeader ,
    CardActions
} from "@mui/material";

const Projects = () => {

    return (
        <Container id='projects' maxWidth={false} sx={{ paddingBottom : 6 , paddingTop : 6 }}>
            <Container>
                <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
                    <Grid item xs={12}>
                        <Typography variant="h4" align={'center'}>
                            <strong>My projects</strong>
                        </Typography>
                        <Typography variant="subtitle1" align={'center'} sx={{ marginTop : 4 , marginBottom : 4 }}>
                            Hi again and welcome to the project section of my portfolio. <br/>
                            Here you can see some of my top Epitech and side projects I made. <br/>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={0} direction='row' alignItems='center' justifyContent='center'>
                            <Card variant={'outlined'}
                                  sx={{ maxWidth : 350 , margin : 3 , boxShadow : 2 }}>  {/* first card project */}
                                <CardContent>
                                    <CardHeader title="epiChat/Irc" subheader="React, Node, Socket.io"/>
                                    <Typography variant="body1">
                                        Group project of 1 to 3 students. <br/>
                                        The goal of the project is to create a React chat app using Socket.io and
                                        Node <br/>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding : 2 }}>
                                    <Link color={'primary'} underline={'always'}
                                          href={'https://github.com/Glados1998/epiChat-myIrc'}
                                          target="_blank" rel="noopener">Github</Link>
                                </CardActions>
                            </Card>

                            <Card variant={'outlined'}
                                  sx={{ maxWidth : 350 , margin : 3 , boxShadow : 2 }}>  {/* second card project */}
                                <CardContent>
                                    <CardHeader title="MyWeatherApp" subheader="Swift"/>
                                    <Typography variant="body1">
                                        Weather app made with swift. <br/>
                                        My first experience with swift and ios development. <br/>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding : 2 }}>
                                    <Link color={'primary'} underline={'always'} href={'https://github.com/Glados1998/my_weatherApp'}
                                          target="_blank" rel="noopener">Github</Link>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid container spacing={0} direction='row' alignItems='center' justifyContent='center'>
                            <Card variant={'outlined'}
                                  sx={{ maxWidth : 350 , margin : 3 , boxShadow : 2 }}>  {/* third card project */}
                                <CardContent>
                                    <CardHeader title="Responsive front-page" subheader="Html, Css, JavaScript"/>
                                    <Typography variant="body1">
                                        Integration of a front-page with a responsive design. <br/>
                                        by using breakpoints and media queries. <br/>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding : 2 }}>
                                    <Link color={'primary'} underline={'always'} href={'https://github.com/Glados1998/ResponsiveFrontPage'}
                                          target="_blank" rel="noopener">Github</Link>
                                </CardActions>
                            </Card>

                            <Card variant={'outlined'}
                                  sx={{ maxWidth : 350 , margin : 3 , boxShadow : 2 }}>  {/* fourth card project */}
                                <CardContent>
                                    <CardHeader title="My Calculator" subheader="Html, Css, JavaScript"/>
                                    <Typography variant="body1">
                                        Creation of a calculator using javascript <br/>
                                        First truly side project I made outside of Epitech.<br/>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ padding : 2 }}>
                                    <Link color={'primary'} underline={'always'} href={'https://github.com/Glados1998/my_calculator'}
                                          target="_blank" rel="noopener">Github</Link>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Typography variant="subtitle1" align={'center'} sx={{ marginTop : 4 , marginBottom : 4 }}>
                            Do you want to see more of my projects? <br/>
                            Click on the link below to see my GitHub profile <br/>
                            <strong>
                                <Link color={'primary'} underline={'always'} href={'https://github.com/Glados1998'}
                                      target="_blank" rel={'noopener'}>my Github</Link>
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
export default Projects;