export const queryUsers = `{  
    users {
      id
      name
      email
      phoneNumber
    }
   }`


export const subUsers = `
subscription { 
    users {
      id
      name
      email
      phoneNumber
    }
 }
`