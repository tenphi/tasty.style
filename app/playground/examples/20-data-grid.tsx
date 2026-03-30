import { tasty } from '@tenphi/tasty';
import { useState } from 'react';
import { IconArrowUp, IconArrowDown, IconSelector } from './icons';

const DATA = [
  { name: 'Alice Johnson', role: 'Engineer', status: 'Active', joined: '2023-01' },
  { name: 'Bob Smith', role: 'Designer', status: 'Active', joined: '2023-03' },
  { name: 'Carol Davis', role: 'PM', status: 'Away', joined: '2022-11' },
  { name: 'Dan Wilson', role: 'Engineer', status: 'Active', joined: '2024-01' },
  { name: 'Eve Martinez', role: 'Designer', status: 'Inactive', joined: '2023-06' },
];

const COLS = ['name', 'role', 'status', 'joined'] as const;
type Col = (typeof COLS)[number];

const Table = tasty({
  styles: {
    display: 'grid',
    gridColumns: '2fr 1fr 1fr 1fr',
    width: 'max 600px',
    radius: '1.5r',
    border: true,
    overflow: 'hidden',
    fill: '#surface',
    scrollbar: 'thin stable',
  },
});

const HeaderCell = tasty({
  as: 'button',
  modProps: { sortDirection: ['asc', 'desc'] as const },
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '0.5x',
    align: 'center',
    padding: '1.5x 2x',
    preset: 't3 strong',
    color: { '': '#text-soft', ':hover': '#accent-text' },
    fill: '#accent-text.03',
    border: '0, 1bw bottom',
    cursor: 'pointer',
    transition: 'theme',
    textAlign: 'left',

    SortIcon: {
      display: 'inline-flex',
      color: {
        '': '#text-soft.4',
        'sortDirection=asc': '#accent-text',
        'sortDirection=desc': '#accent-text',
      },
    },
  },
  elements: { SortIcon: 'span' },
});

const Row = tasty({
  modProps: { isSelected: Boolean },
  styles: {
    display: 'contents',
    Cell: {
      $: '>',
      padding: '1.5x 2x',
      preset: 't3',
      color: '#text',
      border: '0, 1bw bottom',
      transition: 'theme',
      textOverflow: 'ellipsis',
      fill: {
        '': 'transparent',
        '@own(:hover)': '#accent-text.03',
        isSelected: '#accent-text.06',
      },
    },
  },
  elements: { Cell: 'span' },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',
    align: 'center',
    padding: '3x',
  },
});

export const App = () => {
  const [sortCol, setSortCol] = useState<Col>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (col: Col) => {
    if (sortCol === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortCol(col); setSortDir('asc'); }
  };

  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const sorted = [...DATA].sort((a, b) => {
    const cmp = a[sortCol].localeCompare(b[sortCol]);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <Layout>
      <Table>
        {COLS.map((col) => (
          <HeaderCell
            key={col}
            sortDirection={sortCol === col ? sortDir : undefined}
            onClick={() => handleSort(col)}
          >
            {col}
            <HeaderCell.SortIcon>
              {sortCol === col
                ? (sortDir === 'asc' ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />)
                : <IconSelector size={14} />}
            </HeaderCell.SortIcon>
          </HeaderCell>
        ))}
        {sorted.map((row, i) => (
          <Row key={row.name} isSelected={selected.has(i)} onClick={() => toggleSelect(i)}>
            {COLS.map((col) => (
              <Row.Cell key={col}>{row[col]}</Row.Cell>
            ))}
          </Row>
        ))}
      </Table>
    </Layout>
  );
};
