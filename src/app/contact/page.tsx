import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaEnvelope,
  FaHandshake,
  FaVideo,
  FaUsers,
} from "react-icons/fa";

function SocialIcon({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center bg-[#120f0b] text-xl text-[#d8cab7] transition hover:bg-[#B9932F] hover:text-[#15110c]"
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="cinematic-shell text-[#17130e]">
      <section className="px-5 py-14 text-center md:py-20">
        <p className="fedup-eyebrow mb-5">Contact FEDUP</p>
        <h1 className="fedup-title text-5xl md:text-7xl">Let&apos;s Connect</h1>
        <p className="fedup-body mx-auto mt-6 max-w-3xl text-lg">
          Auditions, sponsorships, partnerships, media, and FEDUP inquiries.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-5 lg:px-6">
        <div className="premium-card p-7 lg:col-span-3 md:p-8">
          <h2 className="mb-6 text-3xl font-black text-[#E5C76B]">Send Us A Message</h2>
          <div className="grid gap-4">
            <input placeholder="Full Name" className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F]" />
            <input placeholder="Email Address" className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F]" />
            <input placeholder="Subject" className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F]" />
            <textarea rows={7} placeholder="Message" className="border border-[#B9932F]/20 bg-white p-4 text-[#17130e] outline-none focus:border-[#B9932F]" />
            <button className="premium-button rounded-sm py-4 text-sm">Contact FEDUP</button>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <div className="premium-card p-6">
            <h3 className="mb-5 text-2xl font-black text-[#E5C76B]">Contact Info</h3>
            <div className="space-y-4 text-[#5c5144]">
              <p className="flex items-center gap-3"><FaEnvelope className="text-[#C9A227]" /> info@fedup.tv</p>
              <p className="flex items-center gap-3"><FaUsers className="text-[#C9A227]" /> casting@fedup.tv</p>
              <p className="flex items-center gap-3"><FaHandshake className="text-[#C9A227]" /> partners@fedup.tv</p>
              <p className="flex items-center gap-3"><FaVideo className="text-[#C9A227]" /> media@fedup.tv</p>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="mb-5 text-2xl font-black text-[#E5C76B]">Follow FEDUP</h3>
            <div className="flex gap-3">
              <SocialIcon href="https://www.instagram.com/fedddup_" label="FEDUP Instagram"><FaInstagram /></SocialIcon>
              <SocialIcon href="https://www.facebook.com/FedUpRealitySeries" label="FEDUP Facebook"><FaFacebook /></SocialIcon>
              <SocialIcon href="https://www.youtube.com/@FedUpRealitySeries" label="FEDUP YouTube"><FaYoutube /></SocialIcon>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-6">
        <div className="cinematic-rule mb-12" />
        <h2 className="fedup-title mb-10 text-center text-4xl md:text-6xl">Meet The Team</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              name: "Brandi Johnson",
              role: "Founder",
              links: [
                ["https://www.instagram.com/doughgirl____/", "Brandi Instagram", <FaInstagram key="ig" />],
                ["https://www.facebook.com/profile.php?id=100054002169527", "Brandi Facebook", <FaFacebook key="fb" />],
                ["https://www.tiktok.com/@iamchuckd", "Brandi TikTok", <FaTiktok key="tt" />],
                ["https://linktr.ee/ChuckDaPlug", "Brandi Linktree", <FaGlobe key="web" />],
              ],
            },
            {
              name: "Rashia Wilson",
              role: "Co-Founder",
              links: [
                ["https://www.instagram.com/1stlady_ent/", "Rashia Instagram", <FaInstagram key="ig" />],
                ["https://www.facebook.com/rashia.wilson.3/", "Rashia Facebook", <FaFacebook key="fb" />],
                ["https://www.tiktok.com/@1stlady813", "Rashia TikTok", <FaTiktok key="tt" />],
                ["https://www.youtube.com/@1stladyent813", "Rashia YouTube", <FaYoutube key="yt" />],
                ["https://www.1stladyent.com", "Rashia Website", <FaGlobe key="web" />],
              ],
            },
            {
              name: "Vladimir Florestal",
              role: "Media & Technology",
              links: [
                ["https://www.instagram.com/visions.world.ai/", "Vladimir Instagram", <FaInstagram key="ig" />],
                ["https://www.facebook.com/visionstampa", "Vladimir Facebook", <FaFacebook key="fb" />],
                ["https://www.tiktok.com/@vlad.visions", "Vladimir TikTok", <FaTiktok key="tt" />],
                ["https://visionstampabay.com", "Visions Tampa Bay", <FaGlobe key="web" />],
              ],
            },
          ].map((person) => (
            <div key={person.name} className="premium-card p-7 text-center">
              <h3 className="text-2xl font-black">{person.name}</h3>
              <p className="mb-5 mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#E5C76B]">{person.role}</p>
              <div className="flex flex-wrap justify-center gap-3">
                {person.links.map(([href, label, icon]) => (
                  <SocialIcon key={String(label)} href={String(href)} label={String(label)}>
                    {icon as React.ReactNode}
                  </SocialIcon>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
