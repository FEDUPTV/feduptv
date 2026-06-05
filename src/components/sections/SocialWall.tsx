import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function SocialWall() {
  const socials = [
    {
      title: "FEDUP Instagram",
      icon: <FaInstagram size={32} />,
      link: "https://www.instagram.com/fedddup_",
    },
    {
      title: "FEDUP Facebook",
      icon: <FaFacebookF size={32} />,
      link: "https://www.facebook.com/FedUpRealitySeries",
    },
    {
      title: "FEDUP YouTube",
      icon: <FaYoutube size={32} />,
      link: "https://www.youtube.com/@FedUpRealitySeries",
    },
    {
      title: "Founder",
      icon: <FaInstagram size={32} />,
      link: "https://www.instagram.com/doughgirl____",
    },
    {
      title: "Co-Founder",
      icon: <FaInstagram size={32} />,
      link: "https://www.instagram.com/1stlady_ent",
    },
    {
      title: "Media",
      icon: <FaInstagram size={32} />,
      link: "https://www.instagram.com/visions.world.ai",
    },
  ];

  return (
    <section className="py-24 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-yellow-500 uppercase tracking-[6px] text-center mb-4">
          Follow The Movement
        </p>

        <h2 className="text-5xl font-black text-center mb-12">
          Connect With FEDUP
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {socials.map((social) => (
            <a
              key={social.title}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500 transition flex flex-col items-center justify-center gap-4"
            >
              {social.icon}
              <span className="font-semibold">
                {social.title}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}