import RegistrationForm from "./components/RegistrationForm";
import Sponsors from "./components/Sponsors";
import GifBanner from "./components/GifBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <GifBanner />
        {/* <Sponsors /> */}
        <RegistrationForm />
      </div>
    </main>
  );
}