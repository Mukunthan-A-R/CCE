import TableFilter from "../components/TableFilter";
import HomeUi from "../components/HomeUi";
import WorkingDir from "../components/WorkingDir";

const Home = () => {
  return (
    <div className="m-0 sm:m-0">
      <HomeUi></HomeUi>
      <WorkingDir></WorkingDir>
      <TableFilter></TableFilter>
      <div className="mt-20 text-red-600 flex items-center justify-center">
        <ul className="text-center mb-4">
          <li>* For reference purpose only</li>
          <li>
            * Choice list preparations based on NBA, NAAC and quality seat
            Intake, center of Excellence, Placements and Faculty retention
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
