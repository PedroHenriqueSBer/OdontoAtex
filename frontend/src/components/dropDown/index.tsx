import { IDropDownProps } from "props"
import { Button, Container, Content, MenuItemButton } from "./style"
import { useState } from "react"


export const DropDown = ({
  children,
  options,
  ...contentProps
}: IDropDownProps) => {

  const [isOpen,setIsOpen] = useState(false)

  return (
    <Container>
      {isOpen &&
        <Content {...contentProps}>
          {options.filter(o => o.enable).map(({icon: Icon,name,onClick, variant}, index, self) => 
            <MenuItemButton key={index} className={index === 0 ? 'first' : (self.length-1) === index ? 'last' : ''} variant={variant} onClick={onClick}><Icon width={16} height={16} />{name}</MenuItemButton>
          )}
        </Content>
      }
      <Button onClick={() => setIsOpen(!isOpen)}>{children}</Button>
    </Container>
  )
}