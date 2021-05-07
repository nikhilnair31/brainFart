# To-Do
* Home page
    - [ ] Style the logout button
    - [ ] Have footer stay at botom of page even while searching
    - [x] Add functional search bar
    - [x] Figure out prop drill flow to show profile picture for Google/Anon
    - [x] Add logout button
* Login Component
    - [ ] Add footer with img and privacy policy
    - [x] Add twitter authentication
    - [x] Add anon button 
    - [x] If auth skipped don't allow adding ideas only reading
* AddIdea
    - [x] Check why user context here shows null even though it prints in other scripts
    - [x] Add conditional render if user.isAnon is true
* Idea card
    - [ ] Add functionality to up/down vote buttons considering 1 user can only submit 1 up/down vote for an idea to avoid spamming.
    - [ ] Figure out how to update upvote on only 1 idea and not pull full database to avoid re-render of whole list
    - [x] Trigger re-render of all ideas after deleting some idea
    - [x] Show delete button to user only for their own ideas
    - [x] Add upvote and downvote button
    - [x] Add user and time of idea
    - [x] Add delete button
* Other
    - [ ] Add XML sitemap for SEO
    - [ ] Consider adding Next.js for SSR
    - [ ] Check what robots.txt
    - [x] Check out React routers?
    - [x] Check how to add checkmarks in README