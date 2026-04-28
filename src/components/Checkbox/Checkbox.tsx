import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Checkbox(props: CheckboxProps) {
  const [enabled, setEnabled] = useState(props.checked);

  return (
    <HeadlessCheckbox
      checked={enabled}
      onChange={() => {
        setEnabled(!enabled);
        props.onChange(!enabled);
      }}
      className='group size-4 rounded-sm bg-gray-100 ring-1 ring-gray-400 data-checked:ring-primary-cta ring-inset data-checked:bg-primary-cta'
    >
      <CheckIcon className='hidden size-4 fill-white group-data-checked:block' />
    </HeadlessCheckbox>
  );
}
