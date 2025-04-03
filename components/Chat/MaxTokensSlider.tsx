import { FC, useContext, useState } from 'react';

import { DEFAULT_MAX_TOKENS } from '@/utils/app/const';

import HomeContext from '@/pages/api/home/home.context';

interface Props {
  label: string;
  onChange: (maxTokens: number) => void;
}

const MIN = 100;
const MAX = 2048;

export const MaxTokensSlider: FC<Props> = ({ label, onChange }) => {
  const {
    state: { conversations },
  } = useContext(HomeContext);
  const lastConversation = conversations[conversations.length - 1];
  const [maxTokens, setMaxTokens] = useState(
    lastConversation?.maxTokens ?? DEFAULT_MAX_TOKENS,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setMaxTokens(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="text-left text-neutral-700 dark:text-neutral-400">
        {label}
      </label>
      <span className="mt-2 mb-1 text-center text-neutral-900 dark:text-neutral-100">
        {maxTokens}
      </span>
      <input
        className="cursor-pointer"
        type="range"
        min={MIN}
        max={MAX}
        step={1}
        value={maxTokens}
        onChange={handleChange}
      />
      <ul className="w mt-2 pb-8 flex justify-between text-neutral-900 dark:text-neutral-100">
        <li>{MIN}</li>
        <li>{MAX}</li>
      </ul>
    </div>
  );
};
