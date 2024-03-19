export type MenuItemType = {
  children?: Child[] | any[]
  component?: any
  meta: ChildMeta
  name: string
  path: string
  redirect: null | string
}
type Child = {
  children: string[]
  component: string
  meta: ChildMeta
  name: string
  path: string
  redirect: null
}

type ChildMeta = {
  cache: boolean
  hidden: boolean
  icon: string
  title: string
  linkTo?: string
}
