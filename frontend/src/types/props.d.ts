declare module 'props' {
  export interface IProviderProps {
    children: import('react').ReactNode
  }
  export interface IResultServiceProps<T> {
    data: T,
    message: string,
    error: boolean
  }
  export interface ILogCardProps {
    log: import('models').ILog
  }
  export interface IModalProps {
    isOpen: boolean
    onClose: () => void
  }
  type IUserModalProps = IModalProps & {
    user: import('models').IUser
  }
  type PopupProps = IModalProps & {
    title: string
    icon?: any
    isNotDenied?: boolean
    description: string
    error?: boolean
    onConfirm: () => void
    onDenied: () => void
  }
  interface LoadingHookProps {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
  }
  interface AuthContextProps {
    user: import('models').IUser
    setUser: (value: import('models').IUser) => void
    isTokenValid: boolean
    token: string | undefined
    setToken: (value: string | undefined) => void
    setRefreshToken: (value: string | undefined) => void
    logout: () => void
  }
  export interface ITourProps {
    steps: import('@reactour/tour').StepType[],
    children: import('react').ReactNode
  }

  export interface ISendEmailProps {
    setCode: (value: string) => void
    code: string | null
    setEmail: (value: string) => void
  }
  export interface IDropDownOptions {
    classname?: string,
    onClick: () => void,
    icon: any,
    name: string,
    enable: boolean,
    variant: 'warning' | 'default'
  }
  export interface IDropDownProps {
    children: import('react').ReactNode
    options: IDropDownOptions[]
    marginX: string
    marginY: string
  }
}
