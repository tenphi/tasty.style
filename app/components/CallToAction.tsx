import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import CallToActionClient from './CallToActionClient';

export default function CallToAction() {
  return (
    <CallToActionClient
      installBlock={
        <ServerCodeBlock
          width="max-content"
          placeSelf="center"
          lang="shellscript"
        >
          $ pnpm add @tenphi/tasty
        </ServerCodeBlock>
      }
    />
  );
}
