import NavigationSidebar from "@/components/common/NavigationSidebar/NavigationSidebar";

export default function MainLayout({ children }) {
  return (
    <div>
      <div className="hidden md:flex h-full w-12 z-50  flex-col fixed inset-y-0 bg-white ">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full bg-gray-100">{children}</main>
    </div>
  );
}
