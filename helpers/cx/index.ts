export default function cx<D extends string>(className: string) {
  return (datas: Record<D, boolean>) => ({
    className,
    ...Object.entries(datas).reduce(
      (resolvedDatas, [data, value]) => ({
        ...resolvedDatas,
        [`data-${data}`]: value || undefined,
      }),
      {} as Record<`data-${D}`, 'true' | undefined>,
    ),
  })
}
