export default function MeetTeam() {
  const team = [
    {
      title: "Founder",
      name: "Dough Girl",
      link: "https://www.instagram.com/doughgirl____",
    },
    {
      title: "Co-Founder",
      name: "1st Lady Ent",
      link: "https://www.instagram.com/1stlady_ent",
    },
    {
      title: "Media & Technology",
      name: "Visions World AI",
      link: "https://www.instagram.com/visions.world.ai",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-yellow-500/20">
      <div className="max-w-6xl mx-auto px-6">

        <p className="text-yellow-500 uppercase tracking-[6px] text-center mb-4">
          Meet The Team
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
          The People Behind FEDUP
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <a
              key={member.name}
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500 transition"
            >
              <p className="text-yellow-500 mb-2">
                {member.title}
              </p>

              <h3 className="text-2xl font-bold">
                {member.name}
              </h3>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
