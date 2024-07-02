import { AudioProvider } from "@/components/audio-provider";
import { ILetter } from "@/lib/types";

interface ILetterLayout {
  children: React.ReactNode;
  params: ILetter;
}

export default function LetterLayout({ children, params }: ILetterLayout) {
  return (
    <>
      <AudioProvider params={params}>{children}</AudioProvider>
    </>
  );
}
