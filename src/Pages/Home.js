import TeamMemberCards from "../Components/TeamMemberCards";
import ArchiveCompetitions from "../Components/ArchiveCompetitions";

function Home() {
  return (
    <div>
      <img
        src="/background.jpeg"
        alt="Background"
        className="w-full h-30 object-cover -mt-10 mb-10"
      />

      <TeamMemberCards />
      <ArchiveCompetitions />
    </div>
  );
}

export default Home;
