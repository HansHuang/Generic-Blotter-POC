export const queryUsers = `{  
    users {
      id
      name
      email
      score
    }
   }`


export const subUsers = `
subscription { 
    users {
      id
      name
      email
      score
    }
 }
`