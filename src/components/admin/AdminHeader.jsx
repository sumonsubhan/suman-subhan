import Logo from "../logo/Logo";

export default function AdminHeader() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
      <h2 className="text-lg font-semibold">
        <Logo></Logo>
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}