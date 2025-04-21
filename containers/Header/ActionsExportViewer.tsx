'use client'

import dynamic from 'next/dynamic'

import selectDataset from '@/selectors/selectDataset'

import useStoreState from '@/hooks/useStoreState'

import ActionsExportViewerSkeleton from './ActionsExportViewerSkeleton'

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
  loading: ActionsExportViewerSkeleton,
})

export default function ActionsExportViewer() {
  const dataset = useStoreState(selectDataset)

  return (
    <div className="h-full max-h-[calc(100vh-108px)] overflow-y-auto">
      <ReactJson
        theme="threezerotwofour"
        indentWidth={2}
        src={dataset}
        style={{
          padding: 16,
        }}
      />
    </div>
  )
}
