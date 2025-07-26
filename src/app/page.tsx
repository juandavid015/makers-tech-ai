import Chatbot from "@/features/chatbot/components/container";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen font-sans">
      <h1>Hello World</h1>
      <Chatbot />
    </main>
  );
}
