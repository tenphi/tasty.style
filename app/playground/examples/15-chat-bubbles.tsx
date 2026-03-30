import { tasty } from '@tenphi/tasty';

const MESSAGES = [
  { sender: 'them' as const, name: 'Alice', text: 'Hey! Have you tried Tasty yet?', time: '10:21 AM' },
  { sender: 'me' as const, name: 'You', text: 'Just started! The state maps are incredible.', time: '10:22 AM' },
  { sender: 'them' as const, name: 'Alice', text: 'Wait until you see the radius shapes — leaf and backleaf!', time: '10:23 AM' },
  { sender: 'me' as const, name: 'You', text: 'Already using them. The chat bubbles look so good.', time: '10:24 AM' },
  { sender: 'them' as const, name: 'Alice', text: 'Told you 😄', time: '10:24 AM' },
];

const Chat = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1.5x',
    padding: '2x',
  },
});

const Message = tasty({
  modProps: { sender: ['me', 'them'] as const },
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '0.5x',
    width: 'max 75%',
    margin: { '': 'auto right', 'sender=me': 'auto left' },

    Name: {
      preset: 't3 strong',
      color: '#text-soft',
      padding: '0 1x',
    },
    Bubble: {
      padding: '1.5x 2x',
      preset: 't2',
      radius: {
        '': 'leaf',
        'sender=me': 'backleaf',
      },
      fill: {
        '': '#accent-text.08',
        'sender=me': '#accent-surface',
      },
      color: {
        '': '#text',
        'sender=me': '#accent-surface-text',
      },
    },
    Time: {
      preset: 't3',
      color: '#text-soft.6',
      padding: '0 1x',
      textAlign: { '': 'left', 'sender=me': 'right' },
    },
  },
  elements: {
    Name: 'span',
    Bubble: 'div',
    Time: 'span',
  },
});

export const App = () => (
  <Chat>
    {MESSAGES.map((msg, i) => (
      <Message key={i} sender={msg.sender}>
        <Message.Name>{msg.name}</Message.Name>
        <Message.Bubble>{msg.text}</Message.Bubble>
        <Message.Time>{msg.time}</Message.Time>
      </Message>
    ))}
  </Chat>
);
