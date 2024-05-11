import { TourProvider, StepType } from "@reactour/tour";
import { IProviderProps } from "../types/props";
import { useAuth } from "./useAuth";
import { ReactNode, useEffect, useState } from "react";
import { TypeUser } from "../types/enum";

export const TourContextProvider = ({children} : IProviderProps) => {
  
  const {
    isTokenValid,
    user
  } = useAuth()

  interface returnTurnProvicerProps{
    steps: StepType[],
  }

  const ReturnTurnProvicer = ({
    steps,
  }: returnTurnProvicerProps) => {
    return (
      <>
        <TourProvider 
          steps={steps}
          onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
              if (currentStep === steps.length - 1) {
                setIsOpen(false)
              }
              setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
            }
          }}
          onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
              if (currentStep === steps.length - 1) {
                setIsOpen(false)
              }
              setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
            }
          }}
          >
          {children}
        </TourProvider>
      </>
    )
  }

  return(
    <>
      {!isTokenValid 
        ? (
            <ReturnTurnProvicer steps={[
              {
                selector: '.first-step',
                content: 'Venha aqui para fazer login!',
              },
              {
                selector: '.seccond-step',
                content: 'Em caso de dúvida tente entrar em contato conosco',
              }
            ]} />
        ) : user.type === TypeUser.ADM ? (
            <ReturnTurnProvicer steps={[
              {
                selector: '.patient',
                content: 'Verifique e cadastre clientes no sistema da unifenas',
              },
              {
                selector: '.calendar',
                content: 'Verifique sua agenda, com suas consultas, triagens e etc',
              },
              {
                selector: '.user',
                content: 'Gerencie os usuários do programa',
              }
            ]} />
        ) : user.type === TypeUser.SECRETARY ?
        (
          <ReturnTurnProvicer steps={[
            {
              selector: '.patient',
              content: 'Verifique e cadastre clientes no sistema da unifenas',
            },
            {
              selector: '.calendar',
              content: 'Verifique sua agenda, com suas consultas, triagens e etc',
            }
          ]} />
        )
        : 
        (
          <ReturnTurnProvicer steps={[
            {
              selector: '.patient',
              content: 'Verifique e cadastre clientes no sistema da unifenas',
            },
            {
              selector: '.calendar',
              content: 'Verifique sua agenda, com suas consultas, triagens e etc',
            },
            {
              selector: '.screening',
              content: 'Gerencie suas triagens',
            }
          ]} />
        )
      }
    </>

  )
}