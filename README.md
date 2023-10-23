<div style="color: #dc2626; background: #fca5a522; padding: 8px 16px; border-radius: 8px; font-weight: 900; border-left: 4px solid currentColor; margin-block: 8px;">
  <div>This test and all associated code and data are confidential and are not to be shared with anyone outside of the Epsilon DSVA team.</div>
  <div style="margin-top: 8px">No real data is included in this exercise - everything is randomly generated.</div>
</div>

# Decision Sciences Visual Analytics @ Epsilon - Design & Technical Exercise

### Table of Contents

1. [Intro](#intro)
2. [Scenario](#scenario)
3. [Running the Application](#running-the-application)
4. [Using the Data API](#using-the-data-api)

# Intro

In this exercise, you will design and implement an interactive visualization application. This exercise is created to allow you to showcase your skill in **frontend**, **backend**, **design**, and everything in between required to create a great user experience.

To address this task, you will work backwards from a desired user experience to the set of technologies that enable it.

### Stage 1 - Design

First, you should brainstorm and produce a high-level interface & interaction design. **This is your ideal design**, and should not be constrained by the time you plan to allot for implementation. We expect you to produce one or more design sketches in the medium of your choice.

There is not a specific design we are looking for, as all designs have trade-offs. It is important that you can speak to those trade-offs as you explain your design.

### Stage 2 - Implement

Next, you will implement a proof-of-concept based on your design in Stage 1. We expect a proficient React programmer would spend ~2h on this implementation, but you can spend more time if you would like to flesh out more parts of your design.

In order to best evaluate your proficiency with the fundamental core technologies, we recommend not to use other libraries except those already provided: **React + ReactDOM** and **D3**. Leverage the features of TypeScript as much or little as you are comfortable with.

Designing and implementing a responsive UI is not required, but your interface and any accompanying visualizations should behave reasonably well on a 1920x1080 resolution display.

### Deliverable

Return the **design** and **code** to your technical interviewer by the agreed upon deadline so that he/she can review it prior to your interview. In that interview you can discuss the approach that you took. Take all the time you need to complete this assignment prior to the deadline, and try to keep track of how much time you spent on each section.

# Scenario

In this exercise, you are tasked to build an application for a Pet Store. The owners of the store want to gain insight into purchases and the customers who made them. You need to break down and roll up their data in ways that allow them to answer questions such as:

- _who are our customers?_
- _which types of animals are generating the most revenue?_
- _are there certain types of customers who favor some animals over others?_
- **...and more**

<p style="color: #0891b2; background: #7dd3fc22; padding: 8px 16px; border-radius: 8px; font-weight: 900; border-left: 4px solid currentColor;">
Remember: the owners are <u>not</u> experts in data analysis or visualization and are relying on you to help provide insights to them in a way that they can easily understand.
</p>

The store provided you with a set of **Purchases** and a set of **Customer** information.

Each **Purchase** entry includes the following information:

- `buyer_id`: An ID relating back to the customer who made the purchase
- `date`: The date of the purchase
- `location`: The state where the purchase was made
- `category`: The top-level category of the animal
- `subcategory`: The specific type of animal
- `unit_price`: The price of each animal
- `item_count`: The number of units purchased

Each **Customer** entry includes the following information:

- `buyer_id`: The customer's ID
- `age`: Their age (years)
- `favorite_color`: Their favorite color
- `favorite_color_code`: Their favorite color expressed as a color code
- `favorite_sport`: Their favorite sport
- `favorite_hobby`: Their favorite hobby
- `favorite_food`: Their favorite type of food

Details about retrieving data from the Data API can be found in: [Using the Data API](#using-the-data-api).

# Running the Application

_**Prerequisites:**_ NodeJS 12.x+, npm 6.x+

Below are a set of commands that you can use to run the application during development.

### Install Dependencies

```bash
npm install
# or if using Yarn
yarn
```

### For Development

The React development server will be running at `localhost:9000`, with the data API launched on port `:3333` by default. These ports are defined in the `.env` file.

##### _Runs the Development Server for the API and React Application_

```bash
npm run dev
# or if using Yarn
yarn dev
```

### Build and Run

This will run the API on port `:3333`, statically serving the React Application at `localhost:3333/`

##### _Creates and runs a Production build of the API and React Application_

```bash
npm run build
# or if using Yarn
yarn build

# then, start the built version

npm run serve
# or if using Yarn
yarn serve
```

<p style="color: #dc2626; background: #fca5a522; padding: 8px 16px; border-radius: 8px; font-weight: 900; border-left: 4px solid currentColor;">Troubleshooting webpack and dependency issues is not part of this exercise. If you encounter any issues running the application, please reach out to <a href="mailto:andrew.burks@epsilon.com?subject=DSVA Technical Exercise Issue">andrew.burks@epsilon.com</a> and we will resolve any issues.
</p>

# Using the Data API

You will retrieve the data from a provided local API at from your application at `/api/*`.

Requests made from the application are routed to the API through a proxy, so you may write your code as if the web application and API are hosted on the same port. For example, calling `fetch("/api/people")` from the web application will properly access data from the running API.

<p style="color: #0891b2; background: #7dd3fc22; padding: 8px 16px; border-radius: 8px; font-weight: 900; border-left: 4px solid currentColor;">
The 2 provided endpoints will serve all of the data, but you can also implement other specific endpoints in <code>/api/routes.ts</code> as desired.
</p>

---

### `GET /api/people`

Retrieve information about all customers.

#### Usage

```ts
fetch("/api/people")
  .then((res) => res.json())
  .then((people: Array<Person>) => {
    /* ... */
  });
```

#### Example Output

```json
/* GET /api/people */

[
  {
    "buyer_id": "73ea98c3-9bf2-58c8-bd5f-979b806c0639",
    "age": 52,
    "favorite_color": "slate",
    "favorite_color_code": "#64748b",
    "favorite_sport": "Rugby",
    "favorite_hobby": "Board Games/Puzzles",
    "favorite_food": "Recipes"
  },
  {
    "buyer_id": "ceae2d0c-f571-5877-a392-78bba808ec7f",
    "age": 47,
    "favorite_color": "teal",
    "favorite_color_code": "#14b8a6",
    "favorite_sport": "Pro Ice Hockey",
    "favorite_hobby": "Needlework",
    "favorite_food": "Biscuit Cereals"
  }
  // ... One Row Per Person ...
]
```

---

### `GET /api/purchases`

Retrieve information about all of the purchases.

#### Usage

```ts
fetch("/api/purchases")
  .then((res) => res.json())
  .then((people: Array<Purchase>) => {
    /* ... */
  });
```

#### Example Output

```json
/* GET /api/purchases */

[
  {
    "buyer_id": "8ff56255-cbbe-57ed-9dfa-1c8b21133c8e",
    "date": "5/17/2023",
    "location": "Virginia",
    "category": "pet",
    "subcategory": "hamsters",
    "unit_price": 327.19,
    "item_count": 5
  },
  {
    "buyer_id": "386f9d44-05b7-5a97-bde3-5b6e9a631c1e",
    "date": "9/21/2023",
    "location": "Wyoming",
    "category": "ocean",
    "subcategory": "longsnout seahorse",
    "unit_price": 209.1,
    "item_count": 2
  }
  // ... One Row Per Purchase ...
]
```
