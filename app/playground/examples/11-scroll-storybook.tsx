import { tasty, useStyles } from '@tenphi/tasty';

const PROSE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. ';

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'row wrap',
    gap: '2x',
    padding: '3x',
    align: 'flex-start',
  },
});

const Label = tasty({
  styles: {
    preset: 't3m',
    color: '#text-soft',
    width: '100%',
    textAlign: 'center',
  },
});

const ScrollBox = tasty({
  styles: {
    width: '18x',
    height: 'max 30x',
    padding: '2x',
    radius: '1r',
    fill: '#surface',
    border: true,
    overflow: 'auto',
    flexShrink: 0,
  },
});

const ThinScroll = tasty(ScrollBox, {
  styles: { scrollbar: 'thin' },
});

const HiddenScroll = tasty(ScrollBox, {
  styles: { scrollbar: 'none', fade: '3x top bottom' },
});

const AlwaysScroll = tasty(ScrollBox, {
  styles: {
    scrollbar: 'always #accent-text.30 #accent-text.05',
    fade: '2x bottom',
  },
});

const ClampedBox = tasty({
  styles: {
    width: '18x',
    padding: '2x',
    radius: '1r',
    fill: '#surface',
    border: true,
    flexShrink: 0,
  },
});

function Prose({ text, repeat = 3 }: { text: string; repeat?: number }) {
  const { className } = useStyles({
    preset: 't3',
    color: '#text-soft',
    lineHeight: '1.6',
  });

  return <p className={className}>{text.repeat(repeat)}</p>;
}

function ClampedProse() {
  const { className } = useStyles({
    preset: 't3',
    color: '#text-soft',
    textOverflow: 'ellipsis / 3',
  });

  return <p className={className}>{PROSE.repeat(2)}</p>;
}

export const App = () => (
  <Layout>
    <Label>Thin scrollbar</Label>
    <Label>Hidden + fade</Label>
    <Label>Always + color</Label>
    <Label>Text clamp</Label>

    <ThinScroll>
      <Prose text={PROSE} />
    </ThinScroll>

    <HiddenScroll>
      <Prose text={PROSE} />
    </HiddenScroll>

    <AlwaysScroll>
      <Prose text={PROSE} />
    </AlwaysScroll>

    <ClampedBox>
      <ClampedProse />
    </ClampedBox>
  </Layout>
);
