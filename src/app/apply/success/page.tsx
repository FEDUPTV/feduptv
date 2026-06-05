export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl text-center p-8">

        <h1 className="text-5xl font-black text-yellow-500 mb-6">
          Audition Received
        </h1>

        <p className="text-xl text-gray-300">
          Thank you for sharing your story.
        </p>

        <p className="mt-4 text-gray-400">
          Our casting team will review your application.
          Selected applicants will be contacted regarding
          the Orlando audition.
        </p>

      </div>
    </main>
  );
}