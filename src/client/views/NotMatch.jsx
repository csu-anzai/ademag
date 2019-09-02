import React from 'react';

import { 
  Button,
  Container,
  Header,
  Input

} from 'semantic-ui-react'

export default function NotMatch() {
  return (
    <>
      <Container>
        <Header as='h1' color='violet'>not found</Header>
        <Header as='h5' color='red'>error 404</Header>
        <Input placeholder='Search...' inverted />
        <Button>Click Here</Button>
      </Container>
    </>
  );
}