export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <section className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">À propos</p>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Notre Conecpt et notre Mission
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Ce site présente nos services d'Intelligence Artificielle et d'automatisation. Il explique concrètement ce que nous faisons, comment nous aidons les entreprises à gagner du temps, et comment nous transformons les processus métiers.
          </p>
        </section>

        <section className="grid gap-10 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">Qui sommes-nous ?</h2>
            <p className="mt-4 text-gray-400 leading-7">
              ESN AI est une équipe spécialisée en solutions intelligentes. Nous créons des projets sur mesure en combinant l'IA, l'automatisation et l'intégration de données pour rendre vos opérations plus performantes.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">Ce que propose le site</h2>
            <p className="mt-4 text-gray-400 leading-7">
              Le site présente nos principales offres, des démonstrations de pipelines et d'agents, ainsi que des exemples concrets de solutions d'automatisation pour simplifier vos process internes.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">Pourquoi cette page ?</h2>
            <p className="mt-4 text-gray-400 leading-7">
              Pour expliquer clairement le périmètre du site : services, bénéfices, et la façon dont nous accompagnons les entreprises vers une transformation digitale intelligente.
            </p>
          </div>
        </section>

        <section className="mt-20 rounded-4xl border border-cyan-400/10 bg-cyan-500/5 p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Nos services expliqués</p>
              <h2 className="mt-4 text-3xl font-bold text-white">Ce que vous trouverez ici</h2>
              <p className="mt-6 text-gray-300 leading-8">
                - Conseil en intelligence artificielle et stratégie sur mesure.
              </p>
              <p className="mt-4 text-gray-300 leading-8">
                - Conception de workflows autonomes avec n8n pour automatiser vos tâches répétitives.
              </p>
              <p className="mt-4 text-gray-300 leading-8">
                - Solutions RAG et chatbots intelligents pour exploiter vos données internes.
              </p>
              <p className="mt-4 text-gray-300 leading-8">
                - Accompagnement global, de l'architecture à l'intégration opérationnelle.
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold text-white">Ce site est destiné à :</p>
              <ul className="mt-6 space-y-4 text-gray-300 leading-8 list-disc list-inside">
                <li>Comprendre rapidement nos offres et notre valeur ajoutée.</li>
                <li>Voir des exemples de démos et de cas d'usage.</li>
                <li>Contacter facilement l'équipe pour une étude personnalisée.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
