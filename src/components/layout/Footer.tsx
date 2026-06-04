export default function Footer() {
  return (
    <footer className="border-t border-yellow-500/20 bg-black py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-yellow-500 font-black mb-4">
            FED UP
          </h3>

          <p className="text-gray-400">
            Females Ending Defeat.
            Unleashing Purpose.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Social</h4>

          <a href="https://www.facebook.com/FedUpRealitySeries" className="block mb-2">Facebook</a>
          <a href="https://www.instagram.com/fedddup_" className="block mb-2">Instagram</a>
          <a href="https://www.youtube.com/@FedUpRealitySeries" className="block">YouTube</a>
        </div>

        <div>
          <h4 className="font-bold mb-4">Team</h4>

          <a href="https://www.instagram.com/doughgirl____" className="block mb-2">Founder</a>
          <a href="https://www.instagram.com/1stlady_ent" className="block mb-2">Co-Founder</a>
          <a href="https://www.instagram.com/visions.world.ai" className="block">Media</a>
        </div>

        <div>
          <h4 className="font-bold mb-4">Partners</h4>

          <a href="https://visionstampabay.com" className="block mb-2">
            Visions Tampa Bay
          </a>

          <a href="https://visionsdigitalgroup.com" className="block">
            Visions Digital Group
          </a>
        </div>

      </div>
    </footer>
  );
}
