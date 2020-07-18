exports.typeDefs = `
    type Recipe {
        _id: ID
        name: String!
        category: String!
        description: String!
        instructions: String!
        createdDate: String
        likes: Int
        username: String
    }
    
    type User {
        id: ID
        username: String! @unique
        password: String!
        email: String!
        joinDate: String
        favorites: [Recipe]
    }
    
    type Query {
        getAllRecipes: [Recipe]

        getCurrentUser: User

        getRecipe(_id: ID!): Recipe

        searchRecipes(searchTerm: String, category: String): [Recipe]
    }

    type Token {
        token: String!
    }

    type Mutation {
        addRecipe(
            name: String!, 
            description: String!, 
            category: String!, 
            instructions: String!, 
            username: String): Recipe
        
        signupUser(username: String!, email: String!, password: String!): Token
        
        signinUser(username: String!, password: String!): Token

        addLike(_id: String!): Recipe
    }
    `;
