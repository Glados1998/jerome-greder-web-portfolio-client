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
                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/15 to-transparent"></div>
                <div className="absolute inset-0 flex items-start p-6">
                    <div className="flex flex-col justify-start">
                        <h2 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:translate-y-1">
                            {project.name || 'Untitled Project'}
                        </h2>
                        <p className="text-lg font-bold text-white transition-transform duration-300 group-hover:translate-y-1">
                            {project.headline}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
