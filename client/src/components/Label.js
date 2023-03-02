import styled from 'styled-components';

function Label({ id, children }) {
  return <LabelContainer htmlFor={id}>{children}</LabelContainer>;
}

const LabelContainer = styled.label`
  font-size: var(--font-size-h5);
  font-weight: bold;
`;

export default Label;
