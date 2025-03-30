import PrincipleList from "@/components/PrincipleList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Display the list of principles */}
      <PrincipleList />
    </main>
  );
}
