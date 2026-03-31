import { tasty } from '@tenphi/tasty';
import { useState, useEffect, useCallback } from 'react';
import {
  IconCircleCheck,
  IconCircleX,
  IconAlertTriangle,
  IconInfoCircle,
  IconX,
} from './icons';

type ToastType = 'success' | 'error' | 'warning' | 'info';
interface Toast {
  id: number;
  type: ToastType;
  message: string;
  exiting?: boolean;
}

const ICONS: Record<ToastType, React.FC<{ size?: number }>> = {
  success: IconCircleCheck,
  error: IconCircleX,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
};

const ToastItem = tasty({
  modProps: { isExiting: Boolean },
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1.5x',
    align: 'center',
    padding: '1.5x 2x',
    radius: '1r',
    fill: '#surface',
    border: true,
    shadow: '0 2x 8x #black.10',
    width: 'max 320px',
    $transition: '.3s',
    transition: 'opacity, translate',
    opacity: { '': 1, '@starting': 0, isExiting: 0 },
    transform: {
      '': 'translateX(0)',
      '@starting': 'translateX(4x)',
      isExiting: 'translateX(4x)',
    },

    Icon: { flexShrink: 0 },
    Message: { preset: 't3', color: '#text', flexGrow: 1 },
    Close: {
      display: 'inline-grid',
      placeItems: 'center',
      cursor: 'pointer',
      color: '#text-soft',
      padding: '0.5x',
      radius: '0.5r',
      fill: { '': 'transparent', '@own(:hover)': '#accent-text.06' },
      transition: 'theme',
      border: 'none',
    },
  },
  variants: {
    success: {
      border: '1bw solid #success-accent-text.20',
      Icon: { color: '#success-accent-text' },
    },
    error: {
      border: '1bw solid #danger-accent-text.20',
      Icon: { color: '#danger-accent-text' },
    },
    warning: {
      border: '1bw solid #warning-accent-text.20',
      Icon: { color: '#warning-accent-text' },
    },
    info: {
      border: '1bw solid #info-accent-text.20',
      Icon: { color: '#info-accent-text' },
    },
  },
  elements: {
    Icon: 'span',
    Message: 'span',
    Close: { as: 'button' },
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

const ToastStack = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
    align: 'flex-end',
    width: 'min 320px',
  },
});

const ButtonRow = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '1x', align: 'center' },
});

const TriggerButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '1x 2x',
    radius: true,
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', ':hover': '#accent-text.06' },
    color: '#text',
  },
});

let nextId = 0;
const MESSAGES: Record<ToastType, string> = {
  success: 'Changes saved successfully!',
  error: 'Something went wrong.',
  warning: 'Storage is almost full.',
  info: 'A new update is available.',
};

export const App = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType) => {
    const id = nextId++;
    setToasts((t) => [...t, { id, type, message: MESSAGES[type] }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) =>
      t.map((toast) => (toast.id === id ? { ...toast, exiting: true } : toast)),
    );
    setTimeout(
      () => setToasts((t) => t.filter((toast) => toast.id !== id)),
      300,
    );
  }, []);

  useEffect(() => {
    const timers = toasts
      .filter((t) => !t.exiting)
      .map((t) => setTimeout(() => dismissToast(t.id), 3000));
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismissToast]);

  return (
    <Layout>
      <ButtonRow>
        {(['success', 'error', 'warning', 'info'] as const).map((type) => (
          <TriggerButton key={type} onClick={() => addToast(type)}>
            + {type}
          </TriggerButton>
        ))}
      </ButtonRow>
      <ToastStack>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <ToastItem
              key={toast.id}
              variant={toast.type}
              isExiting={toast.exiting}
            >
              <ToastItem.Icon>
                <Icon size={20} />
              </ToastItem.Icon>
              <ToastItem.Message>{toast.message}</ToastItem.Message>
              <ToastItem.Close onClick={() => dismissToast(toast.id)}>
                <IconX size={16} />
              </ToastItem.Close>
            </ToastItem>
          );
        })}
      </ToastStack>
    </Layout>
  );
};
