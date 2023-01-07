# mongo-social-network-api

This application simulates the functions of a social network. In this app, you can perform all CRUD operations on users and thoughts. Furthermore, you can post text replies to thoughts in the form of reactions. These reactions are added to an array defined in the thoughts' model. You can also add friends to users in the same manner as reactions. Finally, a user's thoughts are removed upon deleted of the user's account. This application uses MongoDB and an extension: Mongoose. The only other dependency is express.
A video walkthrough of each of the operations can be found below.

<br>

## Demonstration of user routes

[![User Routes]](assets/user-routes.mp4)

<br>

## Demonstration of thought routes

<video width="640" height="480" controls>
  <source src="/assets/thought-routes.mp4" type="video/mp4">
</video>

<br>

## Demonstration of reaction routes

<video width="640" height="480" controls>
  <source src="./assets/reaction-routes.mp4" type="video/mp4">
</video>

<br>

## Demonstration of friend routes

<video width="640" height="480" controls>
  <source src="./assets/friend-routes.mp4" type="video/mp4">
</video>
