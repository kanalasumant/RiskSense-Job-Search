# RiskSense Assessment web app

This project is divided into 3 sections.

## Assumptions & considerations

## Results of using different filters

## Project stucture

### Assumptions & considerations

- This project uses react, ant-ui design components, sass for the frontend and node on the backend.
- The most intuitive way of searching and the implementation I chose is, to fill in/ not fill in the search query, apply filters as appropriate and hit on the search button and the ajax call is made to the backend and response is parsed accordingly.
- Since the state is lifted up into a main **container component** which handles state of the filter form elements, search for any change in the filter without clicking on search is easily doable with this approach but is a bit harder to maintain.
- For the backend, I initially considered using google cloud discover jobs API and assumed it had an open database of job postings, but it turned out it is per account basis job search, thus we'd have to create job and search for them. I took the simpler approach of storing the jobs in a **jobs.json** file at the root of the repo and searching against them using JS on node, which in my opinion leads to more productivity.
- However in reality, designing a solid database schema and perform read ops on it would be the optimal approach, but given the time constraints, I instead chose to implement a simple filtering solution with functions in vanilla javascript harnessing modern ES+ features and write **_clean_**, **_short_**, **_maintainable_** and **_functional_** code.

<br />
### Results of using different filters

1.  The first filter on the list of filters on the left section is Skills is internally stored as an array of keywords, but is also tied with the search bar's text at top which is split on spaces and commas. The skills filter is a list of possible keywords to search against.

    - Please enter React or php **_or_** choose from the skills filter list react or php and the related job result wil appear.
    - Another such possible job search is to choose Marketing from skills to reveal its match.
    - Each keyword is searched against the **_title_** and the **_description_** of every job.

2.  To test the functionality of the next filter i.e Availability, **_clear_** all filters by clicking the clear all filter link at the top left section heading and then choose each filter and search against it or a combination of two or all or none.

3.  To test the next filter i.e Job Type, **_clear_** all filters and choose an option from the dropdown.

    - Possible job search options include choosing either **_ADVERTISING AND MARKETING_** or **_COMPUTER AND IT_**.

4.  To test the next filter i.e Pay Rate, **_clear_** all filters and select a range.
    The number inputs and the slider are tied together to ensure consistency.
    Also toggling the **"Include profiles without pay rates"** matches the range provided but also matches postings without a pay rate.

5.  To test the next filter i.e Experience level, **_clear_** all filters and select either of the options.

    - For EXPERIENCED also enable pay rate 40-120 to make sure the job search is matched. This is a good use case of **_mutltiple filter search query_**.

6.  To test the next filter i.e Countries, **_clear_** all filters and choose Canada from the list as it's the only possible match.

7.  To test the next filter i.e Languages, **_clear_** all filters and choose Korean from the list as it's the only possible match.

8.  The last filter which is tied to both the front and the back end is Sort by which appears at the top right corner of the jobs results card section and can be toggled to sort jobs according to the key in the frontend. If selected and other filters and searched against, sort on the backend is also performed.

#### Advanced filtering:

- A possible advanced filter for a match is to select or type "php" from skills, make sure to have hourly included in availability and the pay rate between 20-60.

- Another possible search is search for "web developer" with availability as "full-time", pay rate: 20-60, keeping include profile wihtout pay rates checked and Experience level as "Entry Level".

**_Important Note_**:
Feel free to find new patterns by toggling and trying out different filters.

<br />

### Project stucture

- I chose to approach organizing directory structure based on **_functionality_** of the **_components_** and **_relationships_**.

* Tend to organize more on a tree level basis. For example,

* Components in directory are grouped based on functionality such as being the common children to it's parents and have a single **scss** directory and it's related styled file in it.

* If a main container component and it's children in the sub-directory share the same utility functions or styles, a **utility** directory and a shared **scss** file is used in both these components which stay at the directory level of the main container component.

#### Structure of the codebase:

- For the purposes of ease of deployment on the cloud provider I chose(**Heroku**), both the server-side and the client-side code is in the **same repo** and deployed together.

- For development setup, react app proxies request to the port server it running on,
  but when deployed the server side **renders** the **bundled client-side** code which is built during the build process as described in package.json of the server code.

- A **index.js\*** file has the server code in it with **util.js** having **helper functions** at the **top level** of the repo.

- The client side code lives in the client directory at the top level.

- Source code comprises of both **public** and **src** directories.
- In the **src** directory, index.js is the entry point of the **react dom** rendering to the dom with the id of the only div in **client/public/index/html**.
- App.js contains the main-container component as it's child which in turn consists all of the business logic.
- The **client/public/src/components** directory in **src** is organized according to functionality.
- One **_container_** component handles **_state and handlers_** for all filters and jobs displaying which are **presentational** components which reside in **client/public/src/filters** and **client/public/src/job**.

#### Remarks:

- React provides a declarative way of approach frontend development which is not only maintainable, but performant and scalable. I tend to **_complement_** this by following the **_functional_** programming pattern wherever possible, since the DOM manipulation and side effects are somewhat handled by **react-dom**.
- I tend to use composable code which ultimately leads to easier maintainability in the long run.
- For a use case such as this application, using techologies such as **TypeScript** or **Flow** and **Redux** would help achieve maintainability even more as the project gets bigger and to be used at production level, but React with Javascript gets the job done if prototyping and time-to-ship is under consideration as is in this case.

## License

Copyright © 2018, [Sumant Kanala](https://github.com/kanalasumant).
Released under the MIT LICENSE: http://rem.mit-license.org

---
