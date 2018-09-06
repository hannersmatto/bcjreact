import gql from "graphql-tag";

export default gql(`
mutation($id: ID!) {
  deleteResource(id: $id) {
    id
    res_id
    res_code
    job_title
    email
    phone_work
    phone_home
    phone_mobile
    date_created
    profile_type
    res_type
    is_licensed
    first_name
    last_name
    is_active
    date_connected
    group_count
    identity_provider
  }
}`);
