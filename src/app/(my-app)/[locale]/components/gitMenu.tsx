import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function GitMenu({children, ...props}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={"btn-gitMenu cursor-pointer"}>
                <div>
                        <span>
                        {children}
                        </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"bg-black border-none p-2 dark:bg-white"}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className={"text-white text-md mb-2"}>
                        Repositories
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className={"mx-1.5"}/>
                    {props.repos.map((repo, index) => (
                        <DropdownMenuItem key={index}
                                          className={"text-white font-medium cursor-pointer hover:underline decoration-1"}>
                            <Link href={repo.url} target={"_blank"} rel="noopener noreferrer">
                                {repo.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}
