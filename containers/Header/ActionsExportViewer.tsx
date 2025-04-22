'use client'

import dynamic from 'next/dynamic'

import useDatasetState from '@/hooks/useDatasetState'

import ActionsExportViewerSkeleton from './ActionsExportViewerSkeleton'

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
  loading: ActionsExportViewerSkeleton,
})

export default function ActionsExportViewer() {
  const dataset = useDatasetState()

  return (
    <div className="overflow-y-auto md:h-full md:max-h-[calc(100vh-108px)]">
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
