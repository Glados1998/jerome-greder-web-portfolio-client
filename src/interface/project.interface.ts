import TechInterface from "@/interface/tech.interface";

interface ProjectInterface {

    name: string;
    description: string;
    github?: string;
    link?: string;
    technologies?: TechInterface[];

}

export default ProjectInterface;
