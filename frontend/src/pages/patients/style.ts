import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #E9F2F1;

  @media (max-width: 600px) {
    padding: 1rem;
  }

  .center {
    display: flex;
    justify-content: center;
  }
`;

export const FiltersContainer = styled.div`
  background: white;
  padding: 1rem;  /* Aumentei o padding */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 70%;

  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;  /* Adicionei margem inferior */

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    margin-left: 0;
    width: 100%;
  }

  .add-button {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0.11115rem 0.5rem;
    margin-right: 0;
  }
`;

export const PatientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  height: 25rem;

  @media (max-width: 600px) {
    padding: 0.5rem;  /* Aumentei o padding */
  }
`;

export const PatientCard = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;  /* Adicionei margem inferior */

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .patient-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    width: 100%;

    @media (max-width: 600px) {
      align-items: flex-start;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .edit-button,
  .overview-button {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;

    @media (max-width: 600px) {
      width: 48%;
    }
  }
`;
