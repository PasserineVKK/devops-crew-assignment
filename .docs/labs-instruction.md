# FER202 - Lab Assignments

## Lab 1 - React Components

### Instructions
In this assignment, you will add a new component to the React application to show the list of Orchids at many components. The view for this new component contains 16 items.

### Objectives and Outcomes
In this assignment, you will continue to work with the React application that you have been developing in the exercises. You will add a new component named `Orchids` that will display the list of orchids. You will then design the view for the component. At the end of this assignment, you should have completed the following tasks:
- Created a new `Orchids` component and added it to your React application.
- Updated the view of the `Orchids` component to display 16 orchids (Each orchid information includes: `id`, `image`, `name`, `origin`, `color`, `isSpecial`, `rating`, `isNatural`, `category`).

**Example Orchid Object:**
```json
{
  "id": "1",
  "name": "Taichung beauty",
  "rating": 5,
  "isSpecial": true,
  "isNatural": false,
  "image": "https://barritaorchids.com/cdn/shop/products/Cf592_1024x1024.jpg",
  "color": "pink",
  "numberOfLike": 192,
  "origin": "Taiwan",
  "category": "Cattleya"
}
```

### Assignment Requirements
- All the images put in a folder or URL.
- The data is stored in `ListOfOrchids.js` file.
- Using `map()` to loop the data.
- Using Container and Presentational components.
- The UI looks attractive.

---

## Lab 2 - React Hooks

### Instructions
In this assignment, you will add some React Hooks to the React application. Using your Lab 1 for continuing this Lab.

### Objectives and Outcomes
In this assignment, you will continue to work with the React application that you have been developing in Lab 1. You will add some React Hooks for showing the detail information of an orchid, toggle to the dark and light theme for all elements at your React application. At the end of this assignment, you should have completed the following tasks:
- Created a modal to show the information orchid when you click to Detail button into your React application.
- Toggle the theme mode (dark/light).
- At least initialize a custom hook for your React application.

### Assignment Requirements
- All the images put in a folder or using the URL.
- The data stores in `ListOfOrchids.js` file.
- Using React Hooks including Custom Hook.
- The UI looks attractive.

---

## Lab 3 - React Router

### Instructions
In this assignment, you will add React Router to the React application. Using your Lab 1 for continuing this Lab.

### Objectives and Outcomes
In this assignment, you will continue to work with the React application that you have been developing in Lab 1 and 2. You will add React Router for showing the detail information of an orchid by the detail component, the contact component. At the end of this assignment, you should have completed the following tasks:
- Created the detail component to show the information orchid when you click to Detail button via the parameter of URL.
- Create the contact component to show the contact page.
- Using the React Router for your React application.

### Assignment Requirements
- All the images put in a folder or using the URL.
- The data stores in `ListOfOrchids.js` file.
- Using React Router.
- The UI looks attractive.

---

## Lab 4 - React UI Library

### Instructions
In this assignment, you will add React UI library to the React application. Using your Lab 3 for continuing this Lab.

### Objectives and Outcomes
In this assignment, you will continue to work with the React application that you have been developing in Lab 1, 2, and 3. You will add React UI library for redesigning some components at routes:
- Index (`path="/"`)
- Detail (`path="/detail"`)
- About (`path="/about"`)
- Original (`path="/natural"`): it will show all orchids which are natural (`isSpecial = true`)
- Contact (`path="/contact"`)

Which are used some components of React Bootstrap, React Materialize, or MUI… such as: Modal, Tab, Collapsible, Icon, NavBar, etc.

### Assignment Requirements
- All the images are put in a folder or using the URL.
- The data stored in `ListOfOrchid.js` file, update the data file for showing the clip of orchid.
- Using React UI Library Components.
- The UI looks attractive and you must apply the responsive design.

---

## Lab 5 – CSS Preprocessors

### Instructions
In this assignment, you will use the SCSS code in the React application.

### Objectives and Outcomes
In this assignment, you will create a new React application. You will write SCSS code and then automatically transform it into the corresponding CSS code. At the end of this Lab you will be able to:
- Write SCSS code using many of the features of SCSS.
- Automatically convert the SCSS code into CSS.

### Assignment Requirements
- All the scss files put in a folder `SCSS` which is the subfolder of `src`.
- Build an information page to introduce yourself.
- The UI looks attractive.

---

## Lab 6 – Fetch API

### Instructions
In this assignment, you will use FETCH to communicate with the RESTful API server for Orchids management.

### Objectives and Outcomes
In this assignment, you will create a new React application. You will use FETCH to communicate with the RESTful API server. At the end of this Lab you will be able to:
- Create a project in `mockapi.io` for supplying your JSON data (Orchids management).
- Create a complete React application including routes: Home, Detail, Contact, About,…
- Install and configure Redux for your React app using Redux Toolkit. Create forms and validate data by Formik and Yup.
- Login by Google and perform CRUD API operations using FETCH, AXIOS,…

### Assignment Requirements
- Build a RESTful API server in `mockapi.io`, all the data in your application come from here.
- Using FETCH, AXIOS,… to GET your JSON data from `mockapi.io`.
- Login by Google account and implement POST, PUT, DELETE actions on API.
- The UI looks attractive.
