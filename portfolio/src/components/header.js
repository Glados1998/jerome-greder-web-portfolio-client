import React from 'react';
import {AppBar , Button , Typography , Stack , Toolbar} from "@mui/material";
import {Link} from 'react-scroll';
const header = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow : 1 }}>
                    Jérôme Greder
                </Typography>
                <Stack spacing={3} direction='row' flexWrap={'wrap'}>
                    <Button color={'inherit'}>
                        <Link to="home" smooth={true} duration={2000}>Home</Link>
                    </Button>
                    <Button color={'inherit'}>
                        <Link to="about" smooth={true} duration={2000}>About me</Link>
                    </Button>
                    <Button color={'inherit'}>
                        <Link to="projects" smooth={true} duration={2000}>Projects</Link>
                    </Button>
                    <Button color={'inherit'}>
                        <Link to="contact" smooth={true} duration={2000}>Contact</Link>
                    </Button>
                    <div style={{marginTop: 6}} id='google_translate_element'></div>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default header;