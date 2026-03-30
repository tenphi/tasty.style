/**
 * Curated subset of @tabler/icons-react (outline style only).
 * Replicates the Tabler API: forwardRef components accepting
 * color, size, stroke, title, className, and any extra SVG props.
 *
 * Examples import from './icons' instead of the full 5 000-icon package.
 * To add more icons, copy the SVG path data from @tabler/icons-react
 * and add a new `icon(...)` call below.
 */
import { forwardRef, createElement } from 'react';
import type { SVGAttributes, ReactNode, Ref } from 'react';

interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'stroke'> {
  color?: string;
  size?: number | string;
  stroke?: number;
  title?: string;
  children?: ReactNode;
}

type IconNode = [string, Record<string, string>][];

const SVG_DEFAULTS: SVGAttributes<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function icon(name: string, node: IconNode) {
  const C = forwardRef(
    (
      {
        color = 'currentColor',
        size = 24,
        stroke = 2,
        title,
        className,
        children,
        ...rest
      }: IconProps,
      ref: Ref<SVGSVGElement>,
    ) =>
      createElement(
        'svg',
        {
          ref,
          ...SVG_DEFAULTS,
          width: size,
          height: size,
          className: ['tabler-icon', 'tabler-icon-' + name, className]
            .filter(Boolean)
            .join(' '),
          strokeWidth: stroke,
          stroke: color,
          ...rest,
        },
        [
          title && createElement('title', { key: 'svg-title' }, title),
          ...node.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      ),
  );
  C.displayName = name
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
  return C;
}

// --- Navigation / Layout ---

export const IconHome = icon('home', [
  ['path', { d: 'M5 12l-2 0l9 -9l9 9l-2 0', key: '0' }],
  ['path', { d: 'M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7', key: '1' }],
  ['path', { d: 'M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6', key: '2' }],
]);

export const IconLayoutDashboard = icon('layout-dashboard', [
  [
    'path',
    {
      d: 'M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1',
      key: '0',
    },
  ],
  [
    'path',
    {
      d: 'M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1',
      key: '1',
    },
  ],
  [
    'path',
    {
      d: 'M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1',
      key: '2',
    },
  ],
  [
    'path',
    {
      d: 'M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1',
      key: '3',
    },
  ],
]);

export const IconMenu2 = icon('menu-2', [
  ['path', { d: 'M4 6l16 0', key: '0' }],
  ['path', { d: 'M4 12l16 0', key: '1' }],
  ['path', { d: 'M4 18l16 0', key: '2' }],
]);

export const IconSearch = icon('search', [
  ['path', { d: 'M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', key: '0' }],
  ['path', { d: 'M21 21l-6 -6', key: '1' }],
]);

// --- Actions ---

export const IconSettings = icon('settings', [
  [
    'path',
    {
      d: 'M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065',
      key: '0',
    },
  ],
  ['path', { d: 'M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0', key: '1' }],
]);

export const IconBell = icon('bell', [
  [
    'path',
    {
      d: 'M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6',
      key: '0',
    },
  ],
  ['path', { d: 'M9 17v1a3 3 0 0 0 6 0v-1', key: '1' }],
]);

export const IconUsers = icon('users', [
  ['path', { d: 'M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', key: '0' }],
  [
    'path',
    { d: 'M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2', key: '1' },
  ],
  ['path', { d: 'M16 3.13a4 4 0 0 1 0 7.75', key: '2' }],
  ['path', { d: 'M21 21v-2a4 4 0 0 0 -3 -3.85', key: '3' }],
]);

// --- Chevrons / Arrows ---

export const IconChevronDown = icon('chevron-down', [
  ['path', { d: 'M6 9l6 6l6 -6', key: '0' }],
]);

export const IconChevronUp = icon('chevron-up', [
  ['path', { d: 'M6 15l6 -6l6 6', key: '0' }],
]);

export const IconChevronRight = icon('chevron-right', [
  ['path', { d: 'M9 6l6 6l-6 6', key: '0' }],
]);

export const IconArrowUp = icon('arrow-up', [
  ['path', { d: 'M12 5l0 14', key: '0' }],
  ['path', { d: 'M18 11l-6 -6', key: '1' }],
  ['path', { d: 'M6 11l6 -6', key: '2' }],
]);

export const IconArrowDown = icon('arrow-down', [
  ['path', { d: 'M12 5l0 14', key: '0' }],
  ['path', { d: 'M18 13l-6 6', key: '1' }],
  ['path', { d: 'M6 13l6 6', key: '2' }],
]);

export const IconSelector = icon('selector', [
  ['path', { d: 'M8 9l4 -4l4 4', key: '0' }],
  ['path', { d: 'M16 15l-4 4l-4 -4', key: '1' }],
]);

// --- Status / Feedback ---

export const IconCheck = icon('check', [
  ['path', { d: 'M5 12l5 5l10 -10', key: '0' }],
]);

export const IconX = icon('x', [
  ['path', { d: 'M18 6l-12 12', key: '0' }],
  ['path', { d: 'M6 6l12 12', key: '1' }],
]);

export const IconPlus = icon('plus', [
  ['path', { d: 'M12 5l0 14', key: '0' }],
  ['path', { d: 'M5 12l14 0', key: '1' }],
]);

export const IconMinus = icon('minus', [
  ['path', { d: 'M5 12l14 0', key: '0' }],
]);

export const IconAlertCircle = icon('alert-circle', [
  ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', key: '0' }],
  ['path', { d: 'M12 8v4', key: '1' }],
  ['path', { d: 'M12 16h.01', key: '2' }],
]);

export const IconCircleCheck = icon('circle-check', [
  ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', key: '0' }],
  ['path', { d: 'M9 12l2 2l4 -4', key: '1' }],
]);

export const IconCircleX = icon('circle-x', [
  ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0', key: '0' }],
  ['path', { d: 'M10 10l4 4m0 -4l-4 4', key: '1' }],
]);

export const IconAlertTriangle = icon('alert-triangle', [
  ['path', { d: 'M12 9v4', key: '0' }],
  [
    'path',
    {
      d: 'M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0',
      key: '1',
    },
  ],
  ['path', { d: 'M12 16h.01', key: '2' }],
]);

export const IconInfoCircle = icon('info-circle', [
  ['path', { d: 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', key: '0' }],
  ['path', { d: 'M12 9h.01', key: '1' }],
  ['path', { d: 'M11 12h1v4h1', key: '2' }],
]);

// --- Text formatting ---

export const IconBold = icon('bold', [
  ['path', { d: 'M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7', key: '0' }],
  ['path', { d: 'M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7', key: '1' }],
]);

export const IconItalic = icon('italic', [
  ['path', { d: 'M11 5l6 0', key: '0' }],
  ['path', { d: 'M7 19l6 0', key: '1' }],
  ['path', { d: 'M14 5l-4 14', key: '2' }],
]);

export const IconUnderline = icon('underline', [
  ['path', { d: 'M7 5v5a5 5 0 0 0 10 0v-5', key: '0' }],
  ['path', { d: 'M5 19h14', key: '1' }],
]);

export const IconAlignLeft = icon('align-left', [
  ['path', { d: 'M4 6l16 0', key: '0' }],
  ['path', { d: 'M4 12l10 0', key: '1' }],
  ['path', { d: 'M4 18l14 0', key: '2' }],
]);

export const IconAlignCenter = icon('align-center', [
  ['path', { d: 'M4 6l16 0', key: '0' }],
  ['path', { d: 'M8 12l8 0', key: '1' }],
  ['path', { d: 'M6 18l12 0', key: '2' }],
]);

export const IconAlignRight = icon('align-right', [
  ['path', { d: 'M4 6l16 0', key: '0' }],
  ['path', { d: 'M10 12l10 0', key: '1' }],
  ['path', { d: 'M6 18l14 0', key: '2' }],
]);

export const IconList = icon('list', [
  ['path', { d: 'M9 6l11 0', key: '0' }],
  ['path', { d: 'M9 12l11 0', key: '1' }],
  ['path', { d: 'M9 18l11 0', key: '2' }],
  ['path', { d: 'M5 6l0 .01', key: '3' }],
  ['path', { d: 'M5 12l0 .01', key: '4' }],
  ['path', { d: 'M5 18l0 .01', key: '5' }],
]);

// --- Media / Objects ---

export const IconPhoto = icon('photo', [
  ['path', { d: 'M15 8h.01', key: '0' }],
  [
    'path',
    {
      d: 'M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12',
      key: '1',
    },
  ],
  [
    'path',
    { d: 'M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5', key: '2' },
  ],
  [
    'path',
    { d: 'M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3', key: '3' },
  ],
]);

export const IconLink = icon('link', [
  ['path', { d: 'M9 15l6 -6', key: '0' }],
  [
    'path',
    {
      d: 'M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464',
      key: '1',
    },
  ],
  [
    'path',
    {
      d: 'M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463',
      key: '2',
    },
  ],
]);

export const IconMail = icon('mail', [
  [
    'path',
    {
      d: 'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10',
      key: '0',
    },
  ],
  ['path', { d: 'M3 7l9 6l9 -6', key: '1' }],
]);

export const IconStar = icon('star', [
  [
    'path',
    {
      d: 'M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245',
      key: '0',
    },
  ],
]);

export const IconHeart = icon('heart', [
  [
    'path',
    {
      d: 'M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572',
      key: '0',
    },
  ],
]);

// --- Theme ---

export const IconSun = icon('sun', [
  ['path', { d: 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0', key: '0' }],
  [
    'path',
    {
      d: 'M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7',
      key: '1',
    },
  ],
]);

export const IconMoon = icon('moon', [
  [
    'path',
    {
      d: 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008',
      key: '0',
    },
  ],
]);
