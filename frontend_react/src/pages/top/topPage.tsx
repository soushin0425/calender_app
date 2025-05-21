import Header from "../../components/header/header";
import FullCalendarViewer from "../../components/calender/FullCalendarViewer";

const TopPage: React.FC = () => {
  return (
    <>
      <Header title="トップ" />
      <FullCalendarViewer />
    </>
  );
};

export default TopPage;
