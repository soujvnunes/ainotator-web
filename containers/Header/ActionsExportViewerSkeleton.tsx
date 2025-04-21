import { Fragment } from 'react'

export default function ActionsExportViewerSkeleton() {
  return (
    <div className="animate-pulse space-y-2 bg-[rgb(9,3,0)] p-4">
      {Array.from('groups').map((group) => (
        <Fragment key={group}>
          <div className="h-4 w-40 rounded-xs bg-white/40" />
          {Array.from('blocks').map((block) => (
            <div
              className="ml-4 h-4 w-40 rounded-xs bg-white/20"
              key={block}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
