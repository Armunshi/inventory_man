import LayoutWithSidebar from "./layotuwithsidebar";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <LayoutWithSidebar>
      <Dashboard />
    </LayoutWithSidebar>
  );
}