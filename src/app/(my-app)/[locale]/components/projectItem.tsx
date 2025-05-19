import Link from "next/link";
import minimal from '../assets/images/minimal.jpg';

export default function ProjectItem({ project }) {
    if (!project) return null;

    return (
        <Link href={`/projects/${project.id}`} className="group relative block overflow-hidden rounded-lg shadow-lg bg-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="relative aspect-w-16 aspect-h-9">
                <img 
                    src={project.thumbnail?.url || minimal.src} 
                    alt={project.name || 'Project thumbnail'} 
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-bold text-white transition-transform duration-300 group-hover:translate-y-[-4px]">
                    {project.name || 'Untitled Project'}
                </h2>
            </div>
        </Link>
    );
}
