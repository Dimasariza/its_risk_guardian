export function reconstructData(data1: any, data2: any, dataId: string, addedKey: string) {
  return data1.map((c: any) => {
    const children = data2
    .filter((u: any) => u.data[dataId] == c.data.id)
    .map((u:any, uKey: number) => ({...u, key: `${c.key}${uKey}${addedKey}`}))
    return { ...c, children }
  })
}

export function componentNavigation(data1: any, data2: any, dataId: string) {
  return data1.map((c: any) => {
    const items = data2
    .filter((u: any) => u.data[dataId] == c.data.id)
    .map((u:any, uKey: number) => ({...u, label: u.data.name, key: `${c.key}${uKey}`}))
    return { ...c, label: c.data.name, items }
  })
}