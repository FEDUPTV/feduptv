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

function SocialIcon({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-2xl transition hover:scale-110"
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className=" bg-black text-white">
      <section className="border-b border-yellow-500/20 px-6 py-14 text-center">
        <p className="mb-3 text-sm font-black tracking-[0.4em] text-yellow-500">
          CONTACT FEDUP
        </p>

        <h1 className="text-5xl font-black md:text-6xl">Let's Connect</h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
          Auditions, sponsorships, partnerships, media, and FEDUP inquiries.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-5">
        <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 lg:col-span-3">
          <h2 className="mb-6 text-3xl font-black text-yellow-500">
            Send Us A Message
          </h2>

          <div className="grid gap-4">
            <input placeholder="Full Name" className="rounded-xl bg-black p-4" />
            <input placeholder="Email Address" className="rounded-xl bg-black p-4" />
            <input placeholder="Subject" className="rounded-xl bg-black p-4" />
            <textarea rows={7} placeholder="Message" className="rounded-xl bg-black p-4" />

            <button className="rounded-xl bg-yellow-500 py-4 font-black text-black">
              CONTACT FEDUP
            </button>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h3 className="mb-4 text-2xl font-black text-yellow-500">
              Contact Info
            </h3>

            <p className="mb-3 flex items-center gap-3 text-gray-300">
              <FaEnvelope className="text-yellow-500" /> info@fedup.tv
            </p>
            <p className="mb-3 flex items-center gap-3 text-gray-300">
              <FaUsers className="text-yellow-500" /> casting@fedup.tv
            </p>
            <p className="mb-3 flex items-center gap-3 text-gray-300">
              <FaHandshake className="text-yellow-500" /> partners@fedup.tv
            </p>
            <p className="flex items-center gap-3 text-gray-300">
              <FaVideo className="text-yellow-500" /> media@fedup.tv
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <h3 className="mb-4 text-2xl font-black text-yellow-500">
              Follow FEDUP
            </h3>

            <div className="flex gap-4">
              <SocialIcon href="https://www.instagram.com/fedddup_" label="FEDUP Instagram">
                <FaInstagram className="text-pink-400" />
              </SocialIcon>

              <SocialIcon href="https://www.facebook.com/FedUpRealitySeries" label="FEDUP Facebook">
                <FaFacebook className="text-blue-400" />
              </SocialIcon>

              <SocialIcon href="https://www.youtube.com/@FedUpRealitySeries" label="FEDUP YouTube">
                <FaYoutube className="text-red-500" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="mb-10 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        <h2 className="mb-10 text-center text-5xl font-black text-yellow-500">
          Meet The Team
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 text-center">
            <h3 className="text-2xl font-black">Brandi Johnson</h3>
            <p className="mb-5 text-yellow-500">Founder</p>

            <div className="flex justify-center gap-3">
              <SocialIcon href="https://www.instagram.com/doughgirl____/" label="Brandi Instagram">
                <FaInstagram className="text-pink-400" />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/profile.php?id=100054002169527" label="Brandi Facebook">
                <FaFacebook className="text-blue-400" />
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@iamchuckd" label="Brandi TikTok">
                <FaTiktok className="text-white" />
              </SocialIcon>
              <SocialIcon href="https://linktr.ee/ChuckDaPlug" label="Brandi Linktree">
                <FaGlobe className="text-green-400" />
              </SocialIcon>
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 text-center">
            <h3 className="text-2xl font-black">Rashia Wilson</h3>
            <p className="mb-5 text-yellow-500">Co-Founder</p>

            <div className="flex justify-center gap-3">
              <SocialIcon href="https://www.instagram.com/1stlady_ent/" label="Rashia Instagram">
                <FaInstagram className="text-pink-400" />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/rashia.wilson.3/" label="Rashia Facebook">
                <FaFacebook className="text-blue-400" />
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@1stlady813" label="Rashia TikTok">
                <FaTiktok className="text-white" />
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@1stladyent813" label="Rashia YouTube">
                <FaYoutube className="text-red-500" />
              </SocialIcon>
              <SocialIcon href="https://www.1stladyent.com" label="Rashia Website">
                <FaGlobe className="text-green-400" />
              </SocialIcon>
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-8 text-center">
            <h3 className="text-2xl font-black">Vladimir Florestal</h3>
            <p className="mb-5 text-yellow-500">Media & Technology</p>

            <div className="flex justify-center gap-3">
              <SocialIcon href="https://www.instagram.com/visions.world.ai/" label="Vladimir Instagram">
                <FaInstagram className="text-pink-400" />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/visionstampa" label="Vladimir Facebook">
                <FaFacebook className="text-blue-400" />
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@vlad.visions" label="Vladimir TikTok">
                <FaTiktok className="text-white" />
              </SocialIcon>
              <SocialIcon href="https://visionstampabay.com" label="Visions Tampa Bay">
                <FaGlobe className="text-green-400" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
