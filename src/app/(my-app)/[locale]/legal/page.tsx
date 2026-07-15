export default function Legal() {
    return (
        <>
            <div className='relative px-5 md:px-20 lg:px-40 py-10 mb-40'>
                <div className="text-center">
                    <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold">
                        Mentions légales
                    </h1>
                </div>
                <div className="grid lg:grid-cols-2 grid-rows-2 whitespace-normal">
                    <div className="flex flex-col gap-3.5 mt-10 lg:text-lg ">
                        <div className="">
                            <h1 className="">
                                Entreprise Individuelle : <span
                                className="font-bold">Jérôme-Alexandre Greder - EI</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className="">
                                Numéro SIRET : <span className="font-bold">93224488200019</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className="">
                                Adresse : <span className="font-bold">13 Rue des lilas, 68870 Bartenheim, France</span>
                            </h1>
                        </div>
                        <div>
                            <h1 className="">
                                TVA Intracommunautaire : <span className="font-bold">TVA Non applicable, article 293 B du CGI</span>
                            </h1>
                        </div>
                        <div className="">
                            <h1 className="font-bold lg:text-lg">
                                Informations de Contact :
                            </h1>
                            <div>
                                <p className="">
                                    Email : <span className="font-bold">jerome.greder@icloud.com</span>
                                </p>
                                <p className="">
                                    Téléphone : <span className="font-bold">+33 7 84 25 06 10</span>
                                </p>
                            </div>
                        </div>

                        <div className="">
                            <h1 className="">
                                Directeur de la Publication : <span className="font-bold">Jérôme-Alexandre Greder</span>
                            </h1>
                        </div>
                        <div className="">
                            <h1 className="font-bold lg:text-lg">
                                Hébergeur :
                            </h1>
                            <div className="">
                                <p className="">
                                    Nom de l’hébergeur : <span className="font-bold">Vercel Inc.</span>
                                </p>
                                <p className="">
                                    Adresse : <span
                                    className="font-bold">650 California St, San Francisco, CA 94108, US</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-col items-start justify-start mt-10 gap-6 md:gap-15">
                        <div className="">
                            <h1 className="lg:text-xl font-bold">
                                Propriété Intellectuelle :
                            </h1>
                            <div className="mt-3">
                                <p className="">
                                    Tout le contenu de ce site web, y compris les textes, images, graphismes et logos,
                                    est la propriété intellectuelle de Jérôme-Alexandre Greder, sauf mention contraire.
                                    Toute reproduction, distribution ou utilisation non autorisée de ce contenu sans
                                    permission explicite est interdite et pourra entraîner des poursuites judiciaires.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="lg:text-xl font-bold">
                                Données personnelles – formulaire de contact :
                            </h2>
                            <div className="mt-3 space-y-3">
                                <p>
                                    Les informations envoyées au moyen du formulaire de contact sont traitées par
                                    Jérôme-Alexandre Greder afin de lire votre demande, d’y répondre et d’assurer le
                                    suivi de l’échange. Ce traitement repose sur l’intérêt légitime à répondre aux
                                    demandes volontairement adressées par les visiteurs du site.
                                </p>
                                <p>
                                    Les champs du formulaire sont nécessaires pour traiter la demande. Les données
                                    sont accessibles au responsable du site et transitent par ses prestataires
                                    techniques d’hébergement et d’envoi d’e-mails, Vercel et Resend. Elles ne sont pas
                                    utilisées à des fins de prospection et sont conservées uniquement pendant la durée
                                    nécessaire au traitement et au suivi de l’échange, sous réserve des obligations
                                    légales applicables.
                                </p>
                                <p>
                                    Vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du
                                    traitement de vos données en écrivant à
                                    {" "}<a className="font-bold underline underline-offset-2"
                                           href="mailto:jerome.greder@icloud.com">
                                        jerome.greder@icloud.com
                                    </a>. Vous pouvez également introduire une réclamation auprès de la
                                    {" "}<a className="font-bold underline underline-offset-2"
                                           href="https://www.cnil.fr/" target="_blank" rel="noreferrer">
                                        CNIL
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
