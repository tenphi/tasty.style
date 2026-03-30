import { tasty } from '@tenphi/tasty';

const ResizableContainer = tasty({
  styles: {
    containerType: 'inline-size',
    containerName: 'cards',
    width: '200px 100% 100%',
    padding: '2x',
    radius: '1.5r',
    border: '2bw dashed #border',
    resize: 'horizontal',
    overflow: 'auto',
  },
});

const CardGrid = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '1fr',
      '@(cards, w >= 600px)': '1fr 1fr',
    },
    gap: '2x',
  },
});

const Card = tasty({
  styles: {
    display: 'flex',
    flow: {
      '': 'column',
      '@(cards, w >= 400px)': 'row',
    },
    gap: '2x',
    padding: '2x',
    radius: '1r',
    fill: '#surface',
    border: true,
    overflow: 'hidden',

    Thumbnail: {
      width: {
        '': 'stretch',
        '@(cards, w >= 400px)': '8x',
      },
      height: {
        '': '15x',
        '@(cards, w >= 400px)': 'auto',
      },
      radius: '1r',
      fill: '#accent-text.08',
      flexShrink: 0,
      aspectRatio: { '@(cards, w >= 400px)': '1' },
    },
    Body: {
      display: 'flex',
      flow: 'column',
      gap: '0.5x',
      flexGrow: 1,
    },
    Title: { preset: 't2 strong', color: '#text' },
    Description: { preset: 't3', color: '#text-soft' },
  },
  elements: {
    Thumbnail: 'div',
    Body: 'div',
    Title: 'h3',
    Description: 'p',
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    padding: '3x',
    align: 'center',
  },
});

const Hint = tasty({
  styles: { preset: 't3', color: '#text-soft', textAlign: 'center' },
});

export const App = () => (
  <Layout>
    <Hint>↔ Drag the right edge to resize the container</Hint>
    <ResizableContainer>
      <CardGrid>
        {['Project Alpha', 'Design System', 'Analytics', 'Settings'].map(
          (title) => (
            <Card key={title}>
              <Card.Thumbnail />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Description>
                  This card adapts its layout based on the container width using
                  container queries.
                </Card.Description>
              </Card.Body>
            </Card>
          ),
        )}
      </CardGrid>
    </ResizableContainer>
  </Layout>
);
