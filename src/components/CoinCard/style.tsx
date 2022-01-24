import Styled from "@emotion/styled";

type ButtonProps = {
  added: boolean;
};

export const Container = Styled.div`
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 8px 0px #e3dede;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 15px;
`;

export const Button = Styled.div<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem;
    background-color: ${({ added }) => (added ? "#EA3943" : "#16C784")};
    color: white;
    border-radius: 10px;
    cursor: pointer;
    width: 80px;
`;
