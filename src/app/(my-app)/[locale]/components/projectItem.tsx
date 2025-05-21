import Image from "next/image";
import Link from "next/link";
import minimal from '../assets/images/minimal.jpg';

export default function ProjectItem({ project }) {
    if (!project) return null;

    return (
        <Link href={`/projects/${project.id}`} className="block">
            <div className="group relative w-full h-80 rounded-2xl shadow overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]">
                <Image 
                    src={project.thumbnail?.url || minimal.src} 
                    alt={project.name || 'Project thumbnail'} 
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-transparent"></div>
                <div className="absolute inset-0 flex items-start p-6">
                    <h2 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-y-[4px]">
                        {project.name || 'Untitled Project'}
                    </h2>
                </div>
            </div>
        </Link>
    );
}
