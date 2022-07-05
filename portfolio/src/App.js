import React from 'react';
import Header from "./components/header";
import About from "./pages/about";
import Contact from "./pages/contact";
import Projects from "./pages/projects";
import Intro from "./pages/intro";

function App() {

    return (
        <div>
            <Header/>
            <Intro/>
            <About/>
            <Projects/>
            <Contact/>
        </div>
    );
}

export default App;
