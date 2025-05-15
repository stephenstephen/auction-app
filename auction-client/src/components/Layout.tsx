import { Card, CardContent } from "./ui/card";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-6xl">
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
