import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query me {
    me {
      _id
      username
      email
      address
    }
  }
`;
