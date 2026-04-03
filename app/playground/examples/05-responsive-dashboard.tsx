import { tasty, FLOW_STYLES } from '@tenphi/tasty';
import {
  IconHome,
  IconLayoutDashboard,
  IconUsers,
  IconBell,
  IconSettings,
} from './icons';

const Dashboard = tasty({
  styles: {
    display: 'grid',
    gridColumns: {
      '': '25x 1fr',
      '@tablet': '7x 1fr',
      '@mobile': '1fr',
    },
    gridRows: 'auto 1fr',
    gridAreas: {
      '': '"sidebar header" "sidebar content"',
      '@mobile': '"header" "content"',
    },
    margin: '-2x',
    height: '100dvh',
    width: '100dvw',
    fill: '#accent-text.03',

    Sidebar: {
      gridArea: 'sidebar',
      display: 'flex',
      flow: 'column',
      gap: '0.5x',
      padding: { '': '2x', '@tablet': '1x' },
      fill: '#surface',
      border: '1bw right',
      hide: { '': false, '@mobile': true },
    },
    Header: {
      gridArea: 'header',
      display: 'flex',
      flow: 'row',
      padding: '1.5x, 2.5x left right',
      fill: '#surface',
      border: '1bw bottom',
      align: 'center',
      gap: '1x',
      preset: 't2m',
      color: '#text',
    },
    Content: {
      gridArea: 'content',
      display: 'flex',
      flow: { '': 'row wrap', '@mobile': 'column' },
      gap: { '': '2x', '@mobile': '1.5x' },
      padding: { '': '2x', '@mobile': '1.5x' },
    },
  },
  elements: {
    Sidebar: 'nav',
    Header: 'header',
    Content: 'main',
  },
});

const NavItem = tasty({
  as: 'a',
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    align: 'center',
    padding: '1x 1.5x',
    radius: true,
    preset: 't3',
    cursor: 'pointer',
    transition: 'theme',
    textDecoration: 'none',
    fill: { '': 'transparent', ':hover': '#accent-text.06' },
    color: { '': '#text-soft', ':hover': '#accent-text' },

    Label: {
      hide: { '': false, '@tablet': true },
    },
  },
  elements: { Label: 'span' },
});

const StatCard = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    padding: '2.5x',
    radius: '1.5r',
    fill: '#surface',
    border: true,
    gap: '1x',
    width: { '': 'min 20x', '@mobile': '100%' },
    flexGrow: 1,

    Title: { preset: 't3', color: '#text-soft' },
    Value: { preset: 't1m', color: '#text' },
  },
  elements: { Title: 'span', Value: 'span' },
  styleProps: FLOW_STYLES,
});

export const App = () => (
  <Dashboard>
    <Dashboard.Sidebar>
      <NavItem href="#">
        <IconHome size={20} />
        <NavItem.Label>Home</NavItem.Label>
      </NavItem>
      <NavItem href="#">
        <IconLayoutDashboard size={20} />
        <NavItem.Label>Dashboard</NavItem.Label>
      </NavItem>
      <NavItem href="#">
        <IconUsers size={20} />
        <NavItem.Label>Users</NavItem.Label>
      </NavItem>
      <NavItem href="#">
        <IconBell size={20} />
        <NavItem.Label>Notifications</NavItem.Label>
      </NavItem>
      <NavItem href="#">
        <IconSettings size={20} />
        <NavItem.Label>Settings</NavItem.Label>
      </NavItem>
    </Dashboard.Sidebar>
    <Dashboard.Header>
      <IconLayoutDashboard size={20} />
      Dashboard
    </Dashboard.Header>
    <Dashboard.Content>
      <StatCard>
        <StatCard.Title>Total Users</StatCard.Title>
        <StatCard.Value>12,847</StatCard.Value>
      </StatCard>
      <StatCard>
        <StatCard.Title>Revenue</StatCard.Title>
        <StatCard.Value>$48.2k</StatCard.Value>
      </StatCard>
    </Dashboard.Content>
  </Dashboard>
);
