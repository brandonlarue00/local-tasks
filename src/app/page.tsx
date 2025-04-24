import Kanban from "./components/Kanban";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center">
      <main className="flex flex-1 flex-col w-full items-center justify-between">
        <Kanban />
      </main>
      <Footer />
    </div>
  );
}
