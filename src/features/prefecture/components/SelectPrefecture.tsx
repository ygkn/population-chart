import type { FC } from 'react';

import type { Prefecture } from '../type';

type SelectionData = Set<Prefecture['code']>;

export type Props = {
  prefectures: Prefecture[];
  selected: SelectionData;
  onChange: (newSelected: SelectionData) => void;
};

export const SelectPrefecture: FC<Props> = ({
  prefectures,
  selected,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const code = Number(e.currentTarget.value);

    const newSelected = new Set(selected);

    if (checked) {
      newSelected.add(code);
    } else {
      newSelected.delete(code);
    }

    onChange(newSelected);
  };

  return (
    <div>
      {prefectures.map((prefecture) => (
        <label key={prefecture.code}>
          <input
            type="checkbox"
            name={`${prefecture.code}`}
            value={prefecture.code}
            checked={selected.has(prefecture.code)}
            onChange={handleChange}
          />
          {prefecture.name}
        </label>
      ))}
    </div>
  );
};
