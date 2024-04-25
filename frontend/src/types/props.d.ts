import { ReactNode } from "react";

export interface IProviderProps {
  children: ReactNode
}

export interface IResultServiceProps<T> {
  data: T,
  message: string,
  error: boolean
}

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
}