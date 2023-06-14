# Banga

![image](https://user-images.githubusercontent.com/50814044/233726565-3e48d051-49b7-4b01-b791-6bd699f89c5d.png)

## Online Store Assignment | SCC0219 - Introdução ao Desenvolvimento Web

### Students

- **Arthur Vergaças** | **Número USP:** 12542672
- **Benício Januário** | **Número USP:** 12543843

**Banga** is an innovative online store that offers a wide range of high-quality music instruments for musicians of all levels. What sets Banga apart from other music instrument stores is its unique feature that allows users to listen to the instruments they are interested in purchasing. With Banga's audio database powered by user uploads, customers can get a real feel for the sound and tone of each instrument before making a purchase. Whether it's a guitar, keyboard, drum set, or any other musical instrument, Banga's immersive listening experience provides customers with the confidence and assurance they need to make an informed decision. Combined with a user-friendly website and a vast selection of instruments from renowned brands, Banga is the go-to online store for musicians who want to hear the difference before they buy.

## Requirements

The requirements given in the assignment are added here, for clarity:

- The system must have 2 types of users: **Clients** and **Administrators**
  - **Administrators** are responsible for registering/managing administrators, customers, and products/services provided. The application already comes with an account _admin_ with password _admin_.
  - **Customers** are users who access the system to buy products/services.
- **Administrator** records includes, at least:
  - name
  - id
  - phone
  - email
- **Customers** records includes, at least:
  - name
  - id
  - address
  - phone
  - email
- **Product/services** records include, at least:
  - name
  - id
  - photo
  - description
  - price
  - quantity (in stock)
  - quantity sold.
- Your store may sell products, services or both
- **Selling Products (or services)**: Products are selected, their quantity chosen, and are included in a cart. Products are purchased using a credit card number **(any number is accepted by the system)**. The quantity of product sold is subtracted from the quantity in stock and added to the quantity sold. Carts are emptied only on payment or by customers.
- **Product/Service Management**: Administrators can create/update/read/delete **(CRUD)** new products and services. For example, they can change the stock quantity.
- The system must provide **accessibility requirements** and provide **good usability**. The system must be responsive, meaning that it should complete assigned tasks within a reasonable time.

In addition to the given requirements, this project also has its own requirements:

- **Instrument audio playback**: When navigating through Banga, the customers can choose to listen to the instrument they have interest in buying. The application will then play a sample of the musical instrument displayed. The administrator provides the audio sample when registering the product, similar to how it is done with the product image.

## Project Description

### Tools used

The project is a complete application that will use React in the front-end, Node and Express in the back-end, and Firebase's document-oriented database as the form of persisting data.

The platform for hosting media assets (such as product images and instrument audio samples) will be Cloudinary.

Both back and front-end will use Jest as their testing framework, while more general tests will be performed using Insomnia.

The navigation diagram was made in Draw.io, while the page designs was made in Figma.

### Application Main Structure

The application's main structure will consist of the following screens:

- **Home:** Banga's landing page, where all the available instruments will be displayed.
- **Login/Sign Up**: The user can either login into the application using their email and password or choose to create a new account, where they can provide additional personal information.
- **Product**: Upon selecting a product, the customers will be directed to its details page. There, they will have access to a brief product description, the product image, a sample of its sound, and the buy button.
- **Cart**: On this page, the user has access to all the products they added to the cart, and can choose to finish the purchase.
- **Payment**: On this page, the user can provide their credit card information to finish the purchase.
- **Post Sale**: A purchase confirmation is presented to the users, who can then return to the home page.
- **Profile**: Where the information stored about the customer is displayed. If the user is an administrator, additional management options are displayed.
- **Product/Account Backoffice**: On these pages, the administrator will be able to access all the products and users registered on the system.
- **Product/Account Editing**: Upon selecting a product or user on its respective page, the administrator will be directed to the editing page, where they will be able to modify data such as individual product and user info, product quantity in stock, as well as be able to delete any particular record.

Every page will also contain the application **Navigation Bar**, where the user will be able to navigate to the home page, their cart, or their profile page.

### Application Navigation Diagram

A **navigation diagram** describing the main flow of the application was made in Draw.io, and is presented below:

![image](planning-artifacts/Banga%20-%20Navigation%20Diagram.png)

### Application Page Mockup

The Figma designs for all the main pages in the application can be found here:

- [**Banga's Figma**](https://www.figma.com/file/JF5Lv0DbSIgUlF9dmYGbQT/webproject?node-id=0%3A1&t=Ae8mqRndqE50Jtt1-1).

In addition to the Figma designs, you can find the HTML & CSS for **Home**, **Product details** and **Profile** mockup pages [here](https://github.com/arthurvergacas/banga-online-store/tree/main/planning-artifacts/mockup-pages).

## Comments About the Code

Our codebase is not much more than a simple react structured multipaged project.

Along the prioject tree, it's possible to find various of the main application resources and the application itself. The entry point files, such as `index.tsx`, are the responsible for rendering the main app component - included in `app.tsx`, containing the Banga's navbar and a main content section.

The main application will navigate through the pages being directed to determined routes in order to access specific resources. Those are declared and implemented in `router.tsx` through `react-router-dom` library. Those pages are contained in `src/pages/` and, alongside individual component stylization, respect a global css style contained in `global.css`.

Inside `src/services`, it's possible to find the project's services modules - they manage context-restricted application funcionalities, making the entire project scalable, extensive, readable and debugging-friendly.

Our code respects common organization practices for any React application.

## Test Plan

In our current development process, we have primarily relied on simple manual tests to ensure the functionality and stability of our system. While these tests have served us adequately so far, we recognize the immense benefits that automated tests can bring to our project - specifically integration ones.

However, before we start implementing integration tests, it is crucial to establish a solid foundation at the backend layer. Once we have well-defined NodeJS backend layer, we should proceed with the development of automated tests focused on the frontend x backend interaction. These tests will validate the communication and data exchange between the user interface and the underlying system, one of the most flaky interactions in an application's flow.

In summary, while we have relied on simple manual tests for now, although we recognize it's necessary to implement automated integration tests for frontend/backend interfacing. By doing so, we can ensure the stability and reliability of our system.

## Test Results

The simple manual tests for the main application have been completed without any complications. The application functioned perfectly during testing, ensuring its behavior parity with what we expected.

## Build Procedures

First of all, it's necessary to clone this repository and, if already cloned, make sure you've got the most recent project version.
`git clone https://github.com/arthurvergacas/banga-online-store.git`

And, inside the cloned folder:
`git pull origin main`

After this, the following steps are extremely similar to any other simple React application:
`npm install && npm run start:frontend`

## Problems

One of the most relevant project's complications were the really numerous pages to develop. The quantity turned something easy in a massive manual labor.
