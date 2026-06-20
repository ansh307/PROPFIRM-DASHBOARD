import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 ml-18">{children}</main>
    </div>
  );
};

export default layout;
