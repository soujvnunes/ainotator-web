'use client'

import dynamic from 'next/dynamic'

import selectDataset from '@/selectors/selectDataset'

import useStoreState from '@/hooks/useStoreState'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

export default function ActionsExportViewer() {
  const dataset = useStoreState(selectDataset)

  return (
    <ReactJson
      theme="threezerotwofour"
      indentWidth={2}
      src={dataset}
      style={{
        padding: 16,
      }}
    />
  )
}
