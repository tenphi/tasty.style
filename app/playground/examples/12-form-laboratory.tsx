import { tasty } from '@tenphi/tasty';
import { useState } from 'react';

const Field = tasty({
  modProps: { isInvalid: Boolean, isDisabled: Boolean, isFilled: Boolean },
  styles: {
    display: 'flex',
    flow: 'column',
    position: 'relative',
    width: 'max 340px',
    gap: '0.5x',
    transition: 'theme .2s',

    Label: {
      preset: 't3',
      position: 'absolute',
      inset: '1.5x top, 2x left',
      color: {
        '': '#text-soft',
        isFilled: '#accent-text',
        isInvalid: '#danger-accent-text',
        isDisabled: '#text-soft.5',
      },
      transform: {
        '': 'translateY(0)',
        isFilled: 'translateY(-3x) scale(0.85)',
      },
      transformOrigin: 'left top',
      transition: 'translate .2s, scale .2s, theme .2s',
      pointerEvents: 'none',
    },
    Input: {
      $: '>',
      padding: '2.5x 2x 1x',
      preset: 't2',
      radius: '1r',
      border: {
        '': '1bw solid #border',
        '@own(:focus)': '2bw solid #accent-text',
        isInvalid: '2bw solid #danger-accent-text',
        isDisabled: '1bw solid #border.5',
      },
      outline: { '': 'none', '@own(:focus)': '2ow #accent-text.20 / 1px' },
      fill: { '': '#surface', isDisabled: '#accent-text.03' },
      color: { '': '#text', isDisabled: '#text-soft' },
      transition: 'theme .2s',
      cursor: { isDisabled: 'not-allowed' },
    },
    Helper: {
      preset: 't3',
      color: '#text-soft',
      padding: '0 2x',
    },
    Error: {
      preset: 't3',
      color: '#danger-accent-text',
      padding: '0 2x',
    },
  },
  elements: {
    Label: 'label',
    Input: { as: 'input' },
    Helper: 'span',
    Error: 'span',
  },
});

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '4x',
  },
});

const Row = tasty({
  styles: { display: 'flex', flow: 'row wrap', gap: '1x', align: 'center' },
});

const Toggle = tasty({
  as: 'button',
  modProps: { isActive: Boolean },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    padding: '0.75x 1.5x',
    radius: 'round',
    cursor: 'pointer',
    preset: 't3',
    transition: 'theme',
    border: true,
    fill: { '': '#surface', isActive: '#accent-text.10' },
    color: { '': '#text-soft', isActive: '#accent-text' },
  },
});

export const App = () => {
  const [value, setValue] = useState('');
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const filled = value.length > 0;

  return (
    <Layout>
      <Field isInvalid={invalid} isDisabled={disabled} isFilled={filled}>
        <Field.Label>Email address</Field.Label>
        <Field.Input
          type="email"
          value={value}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
        {invalid ? (
          <Field.Error>Please enter a valid email</Field.Error>
        ) : (
          <Field.Helper>We&apos;ll never share your email</Field.Helper>
        )}
      </Field>
      <Row>
        <Toggle
          isActive={invalid}
          onClick={() => setInvalid((v) => !v)}
        >
          Invalid {invalid ? '✓' : ''}
        </Toggle>
        <Toggle
          isActive={disabled}
          onClick={() => setDisabled((d) => !d)}
        >
          Disabled {disabled ? '✓' : ''}
        </Toggle>
      </Row>
    </Layout>
  );
};
