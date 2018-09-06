import gql from "graphql-tag";

export default gql(`
mutation(
      $first_name: String
  )
  {
  createResource(
        first_name: $first_name

  ){
      id
  }
}`);
