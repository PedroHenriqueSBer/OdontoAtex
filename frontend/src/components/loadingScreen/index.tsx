import { Containter } from "./style"

interface LoadingScreenProps {
  isLoading: boolean
}

export const LoadingScreen = ({
  isLoading
}: LoadingScreenProps) => {
  return (
    <>
      {isLoading &&
        <Containter>
          <span />
        </Containter>
      }
    </>
  )
}