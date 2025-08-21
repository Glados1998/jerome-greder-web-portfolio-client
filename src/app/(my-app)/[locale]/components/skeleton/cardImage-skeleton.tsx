import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function CardImageSkeleton() {
    return (
        <Skeleton className={"w-100 h-80 rounded-2xl shadow"}/>
    );
}

export default CardImageSkeleton;
