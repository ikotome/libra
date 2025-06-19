import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type BookManager = {
  id: number;
  name: string;
  status: string;
}
const books: BookManager[] = [
  { id: 1, name: "React入門", status: "在庫あり" },
  { id: 2, name: "TypeScript入門", status: "貸出中" },
  { id: 3, name: "Next.js入門", status: "返却済" },
];

const app = new Hono()

app.get('/', (c) => {
  // /books?keyword=React
  return c.text('Hello Hono!')
})

// /books GET
app.get("/books",(c)=>{
  const query = c.req.query();
  const keyword = query.keyword;

  if(keyword){
    return c.json(books.filter((book) => book.name.includes(keyword)));
  }
  return c.json(books);
})

// /books POST
app.post("/books", async (c)=> {
  const body = await c.req.json();
  const name = body.name;

  const newBook = {
    id: books.length + 1,
    name: name,
    status: "在庫あり",
  };

  books.push(newBook);

  return c.json(newBook);
})

// /books/:id PUT
// /books/:id DELETE


const port = 8080;
serve({ 
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
