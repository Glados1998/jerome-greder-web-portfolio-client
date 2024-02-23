export default function ProgrammingTag({programmingTag}) {
    return (
        <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {programmingTag.attributes.label}
        </span>
    )
}