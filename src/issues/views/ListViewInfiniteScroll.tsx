import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { LoadingSpinner } from '../components/loadingSpinner';

import { TState } from '../../interfaces';
import { useIssuesInfinite } from '../../hooks';

export const ListViewInfiniteScroll = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [issuesStateToShow, setIssuesStateToShow] = useState<TState | undefined>(undefined);
  const { issuesQuery } = useIssuesInfinite({
    state: issuesStateToShow,
    labels: selectedLabels
  });

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
          // El .flat es porque el infinteQuery me devuelve un arreglos de arreglos de issues [[issue1,issue2],[issue3,issue4],[issue5,issue6]]
          // y el componente IssueList espera recibir un arreglo de issues
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={issuesStateToShow}
            onStateChange={onStateChange}
          />
        )}
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button
            className='btn btn-outline-primary mt-2'
            disabled={!issuesQuery.hasNextPage}
            //En este caso se hace con un boton pero si se quisiera hacer con un scroll habría que agregar un evento al dom y cuando llegue al final
            //dispare el fetchNextPage.
            onClick={() => issuesQuery.fetchNextPage()}
          >
            Load more...
          </button>
        </div>
      </div>

      <div className='col-4'>
        <LabelPicker onListLabelChange={onListLabelChange} selectedLabels={selectedLabels} />
      </div>
    </div>
  );
};
