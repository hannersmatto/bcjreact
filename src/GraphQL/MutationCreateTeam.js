import gql from "graphql-tag";

export default gql(`
mutation(
  $name: String

 )
  {
  createTeam(

    name: $name

  ) {
    id
    
  }
}`);
