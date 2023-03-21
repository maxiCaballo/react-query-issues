import { FC } from 'react';
import { useLabels } from '../../hooks/useLabels';
import { LoadingSpinner } from './loadingSpinner';

interface Props {
  onListLabelChange: (labelName: string) => void;
  selectedLabels: string[];
}

export const LabelPicker: FC<Props> = ({ onListLabelChange, selectedLabels }) => {
  const { data, isLoading, error, isFetching } = useLabels();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${selectedLabels.includes(label.name) ? 'label-active' : ''}`}
          style={{ border: `1px solid #${label.color}`, color: `#${label.color}` }}
          onClick={() => onListLabelChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
