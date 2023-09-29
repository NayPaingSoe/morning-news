import Navbar from "@/components/Navbar";
import NewsList from "@/components/NewsLists";

export default function Home() {
  return (
    <main className="min-h-[90vh]">
      <Navbar></Navbar>
      <NewsList />
    </main>
  );
}
