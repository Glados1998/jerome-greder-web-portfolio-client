import ProjectInterface from "@/interface/project.interface";


const projects: ProjectInterface[] = [
    {
        name: "Kotlin Restaurant",
        github: "https://github.com/Glados1998/restaurant",
        technologies: [
            {
                label: "Kotlin",
            },
            {
                label: "Spring Boot",
            },
            {
                label: "MySQL",
            },
        ]
    },
    {
        name: "epiChat",
        github: "https://github.com/Glados1998/epiChat",
        technologies: [
            {
                label: "Node.js",
            },
            {
                label: "Express",
            },
            {
                label: "Socket.io",
            },
            {
                label: "React",
            },
        ]
    },
    {
        name: "pokeDex",
        github: "https://github.com/Glados1998/pokeDex",
        technologies: [
            {
                label: "React",
            },
            {
                label: "Axios",
            },
            {
                label: "Reducer",
            },
            {
                label: "API",
            },
            {
                label: "Scss",
            },
        ]
    },
    {
        name: "my-wackeep",
        github: "https://github.com/Glados1998/my-wackeep",
        technologies: [
            {
                label: "PHP",
            },
            {
                label: "MySQL",
            },
            {
                label: "Bootstrap",
            },
            {
                label: "JavaScript",
            },
        ]
    },
]

export default projects;
