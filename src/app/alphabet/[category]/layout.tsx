import { SupportMe } from "@/components/SupportMe";
interface ICategory {
  children: React.ReactNode;
}

export default function Category({ children }: ICategory) {
  return <>{children}</>;
}
