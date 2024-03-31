import { ComponentProps } from "react"
import { Container } from "./style"

type IIconButton = ComponentProps<'button'> & {
  Icon: any
  IconProps?: {
    size: number | string
  }
}

export const IconButton = ({
  Icon,
  IconProps,
  ...props
}: IIconButton) => {
  return (
    <Container {...props}>
      <Icon
        width={IconProps?.size}
        height={IconProps?.size}
      />
    </Container>
  )
}