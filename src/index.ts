import express from 'express'
import { ApolloServer } from '@apollo/server';
import {  expressMiddleware } from '@apollo/server/express4';

async function init(){
    const app = express();
const PORT = Number(process.env.PORT) || 8000;

// Creating Graphql server
const gqlserver = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
    resolvers: {
        Query: {
            hello: () => `Hey there, I am a graphql server`,
            say: (_, {name}: {name: String} ) => `Hey ${name}, how are you?`
        },
    },
})

// Starting the gql server
await gqlserver.start();

app.use(express.json());

app.get('/', (req,res) => {
    res.json({ message: "Server is up and running"});
});

app.use('/graphql', expressMiddleware(gqlserver))

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))
}

init();