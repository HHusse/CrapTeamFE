import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <img
        src="/background.jpeg"
        alt="Background"
        className="w-full h-42 object-cover"
      />
      <Footer />
    </div>
  );
}

export default Home;
