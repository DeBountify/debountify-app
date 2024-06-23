import dynamic from "next/dynamic";

const IconTemplate = dynamic(() => import("@/components/Icons/IconTemplate"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-red-400 font-bold">DeBountify Base template</h1>
      <IconTemplate icon={"arcticons:cyberghost"}/>
    </main>
  );
}
