


export default function Layout({ user, children }: { user: { name: string }; children?: React.ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue {user?.name}</h1>
      <div>{children}</div>
    </div>
  );
}
