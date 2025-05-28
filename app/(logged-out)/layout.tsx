import LightDarkToggle from "@/components/ui/light-dark-toggle";

type Props = {
  children?: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-24">
        {children}
      </div>
      <LightDarkToggle className="fixed top-1/2 right-2 -mt-3" />
    </>
  );
}
