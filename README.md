# **Katha**

A vault system to keep me from **completely losing my mind**. This is a simple and neat inventory management system where I can store everything that matters, *so I can stay present and not spiral into insanity*. "Katha" means **"created by the mind"**, which means it's up to me to turn thoughts into reality… or at least attempt to.

### Tech Stack:

- Next.js
- Supabase
- Drizzle
- Postgres
- React
- Typescript
- Tailwind & Sass
- Motion & Lenis scroll & React three fiber
- Shadcn
- Mailjet

## Flow

1. Remember that this thing exist
2. Write or attach important happenings, emotions, ideas, inspirations etc. (make sure to add a short description or click the AI description generate) to your desired category
3. Link or connect other entries by embedding or adding related entry manually or by AI
4. Add tags, favorite or make it as important
5. Check the dashboard for AI powered sanity check, ideas via kAIa, and your progress via graph
6. Talk to Kath AI "kAIa" to unlock you sixth sense
	- Generate linked or connected ideas base on user prompt
	- Talk the happenings and feel better
	- (I'll make sure to make kAIa only talk inside katha)
7. Generate blogs base on your entries with kAIa help
8. Keep track of your progress via graphs and kAIa
9. Daily check in and keep the streak going 
10. Actually remember that this thing exist for the second time

#### CHECKPOINT

- [x] Relearn how the routing and auth flows (atleast)
  - focus on the big picture and go to details once a problem occured
  - So far I already grasp how the full routing works and discover a new flaw once the db is implemented
  - Now, siguro I'll go and figure out the auth?? but I think I have a pretty good foundation for this since I fucking suffer building that absolute nonsense, I get the flow and how the file structre works together
- [x] Will make the idea better since its completely obselete now
  - Reiterate and improve
- [x] Dockering
- [x] Cursor fix
- [x] Bun era
- [ ] Recall some features and react hooks
    [ ] 
    [ ] 
- [ ] Make huge changes to the ui and ux 
- [ ] 
- [ ] 

--- 

#### To-Do

- BUILD
  
  - [x] Nextjs installation
  - [x] Bun for everthing
  - [x] App/project structure (app router)
  - [x] Remove unecessary/unused components/styling
  - [ ] Dependencies
    - [x] @supabase/supabase-js @supabase/ssr
    - [ ] node-mailjet
    - [ ] zod
    - [ ] react-hook-form
    - [ ] @hookform/resolvers
    - [ ] @tanstack/react-query
    - [ ] @tanstack/react-query-devtools
    - [ ] Shadcn
  - [ ] 

- AUTH (Supabase)
  
  - [x] Packages @supabase/supabase-js @supabase/ssr
  - [x] Env. vars
  - [x] Supabase clients
    - [x] Client component client
    - [x] Server component client

- ROUTING (nextjs app router)

  - [ ] Dynamic routing
  - [ ] Default route as home + middleware checks
  - [ ] notFound() page handler (not-found.tsx)
  - [ ] Route config
  - [ ] Auth route/layout pages (login & signup)
  - [ ] Page parsing
  - [ ] Protected routes (dashboard)
  - [ ] Error page (error.tsx)
  - [ ] Refine middleware logic
  - [ ] Metadata for each pages (MatterProvider)
  - [ ] Worried about the routing for each generated katha by each user since the dashboard routing is very limited to _pages folder

- ERUDITON

  - [x] Use case for supabase clients:
      ```
      - Client component client: displaying updates e.g User Info (frontend side, faster, optimistic UI updates, relies heavily on RLS for security)
      - Server component client: manipulating data & auth (used via server actions & route handlers, complex backend logic, security)
      - NOTE: server actions are mostly prefered for most use case especially data mutations (create, update, delete) for more secure and efficient way to perform server-side logic from client-side interactions, often resulting in a better developer experience and potentially better performance due to automatic revalidation.

      ```

- NOTE

  - Builds and dev check to avoid issues on deployment
  - React scan (forgot about the auth component)
