# tedx-auth api 

auth api for recruitment using node + express
basic jwt based login + google oauth  
admin protected routes and role-based access

---

## stack

- backend: nodejs + express + typescript  
- database: postgres (via prisma orm)
- auth: jwt, bcrypt, express-session, passport-google-oauth20  
- frontend: next.js + tailwind  
- validation: zod

---

## features

- signup + login with JWT
- password hashing using bcrypt
- zod validation is reflected on frontend
- google oauth login (passport)
- role-based access (admin/user)
- protected dashboard route using middleware and controller
- logout by clearing localstorage
- basic frontend fro testing purpose 
- eye open/close lucid react icon to see/unsee password

---

##  run

```bash
# running backend (root)
cd auth-api
npm i
npx prisma migrate dev
npm run dev # run node in port 5001

# run frontend 
cd frontend
npm install
npm run dev # run next in port 3000


# inside root create a .env file 
DATABASE_URL=postgres://...
JWT_SECRET=some_long_secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

