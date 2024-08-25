export default async function Legal() {
    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className="text-center">
                    <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                        Mentions légales
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-2xl font-medium mt-4">
                    </p>
                    <hr className="mt-4 w-20 mx-auto border-black dark:border-white"/>
                </div>
                <div className="grid lg:grid-cols-2 grid-rows-2">
                    <div className="flex flex-col md:flex-col items-start justify-start mt-10 gap-6 md:gap-15">
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Entreprise Individuelle : Jérôme-Alexandre Greder EI
                            </h1>
                        </div>
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Numéro SIRET : 93224488200019
                            </h1>
                        </div>
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Adresse : 13 Rue des lilas, 68870 Bartenheim, France
                            </h1>
                        </div>
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                TVA Intracommunautaire : TVA Non applicable, article 293 B du CGI
                            </h1>
                        </div>
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Informations de Contact :
                            </h1>
                            <div className="ml-4">
                                <p className="text-l md:text-2l lg:text-xl mb-4 mt-4">
                                    Email : <span className="font-bold">jerome.greder@icloud.com</span>
                                </p>
                                <p className="text-l md:text-2l lg:text-xl mb-4">
                                    Téléphone : <span className="font-bold">+33 7 84 25 06 10</span>
                                </p>
                            </div>
                        </div>

                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Directeur de la Publication : Jérôme-Alexandre Greder
                            </h1>
                        </div>
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Hébergeur :
                            </h1>
                            <div className="ml-4">
                                <p className="text-l md:text-2l lg:text-xl mb-4 mt-4">
                                    Nom de l’hébergeur : <span className="font-bold">Vercel Inc.</span>
                                </p>
                                <p className="text-l md:text-2l lg:text-xl mb-4">
                                    Adresse : <span
                                    className="font-bold">650 California St, San Francisco, CA 94108, US</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-col items-start justify-start mt-10 gap-6 md:gap-15">
                        <div className="text-left">
                            <h1 className="text-l md:text-xl lg:text-2xl font-medium">
                                Propriété Intellectuelle :
                            </h1>
                            <div className="ml-4">
                                <p className="text-l md:text-2l lg:text-xl mb-4 mt-4">
                                    Tout le contenu de ce site web, y compris les textes, images, graphismes et logos,
                                    est la propriété intellectuelle de Jérôme-Alexandre Greder, sauf mention contraire.
                                    Toute reproduction, distribution ou utilisation non autorisée de ce contenu sans
                                    permission explicite est interdite et pourra entraîner des poursuites judiciaires.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
