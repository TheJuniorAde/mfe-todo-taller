# mfe-todo-taller

## stack
proudly built using `react` (with `module federation`!), `typescript`, `tailwind` and `jest`

## setup
- For `create`: run `yarn install` on `create` root, then `yarn` to start
- For `list`: run `yarn install` on `list` root, then `yarn` to start
- For `host`: run `yarn install` on `create` root, then `yarn` to start

## running
- Go to [http://localhost:3000](http://localhost:3000)
- You'll find the list of tasks (completed and incomplete)
- Through the nav bar you can navigate to create a todo

## testing
- simply run `yarn test` at the root of each `mfe`

## overview
For this project, `module federation` was utilized to expose and consume back to back all the MFEs. The choice was made out of ease of use and larger documentation.

The context implementation resides inside the main `host` application, but it should work fine when accessing each individual `mfe` as there exist some logic specific to each project.

The common elements to each `mfe` (like `Footer` and `Header`) were also packaged inside the `host` application, for ease of use reasons.

The tests were written with some mocks where the functionality would be directly tested elsewhere (like mocking the context interactions and `Header/Footer` inside the `create` and `list` `mfes`)