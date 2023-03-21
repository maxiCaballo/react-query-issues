import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingSpinner } from '../components/loadingSpinner';

import { useIssues } from '../../hooks';
import { TState } from '../../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [issuesStateToShow, setIssuesStateToShow] = useState<TState | undefined>(undefined);
  const { issuesQuery, page, nextPage, prevPage } = useIssues({ state: issuesStateToShow, labels: selectedLabels });

  const onListLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  const onStateChange = (state?: TState) => {
    setIssuesStateToShow(state);
  };

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <IssueList issues={issuesQuery.data || []} state={issuesStateToShow} onStateChange={onStateChange} />
        )}
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button className='btn btn-outline-primary' onClick={prevPage} disabled={issuesQuery.isFetching}>
            Prev
          </button>
          <span>{page}</span>
          <button className='btn btn-outline-primary' onClick={nextPage} disabled={issuesQuery.isFetching}>
            Next
          </button>
        </div>
      </div>

      <div className='col-4'>
        <LabelPicker onListLabelChange={onListLabelChange} selectedLabels={selectedLabels} />
      </div>
    </div>
  );
};
