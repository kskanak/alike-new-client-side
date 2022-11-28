import React from "react";

const Blog = () => {
  return (
    <div>
      <div>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8 text-muted">
            <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl text-emerald-800 underline">
              Blog
            </h2>

            <div className="divide-y divide-gray-700">
              <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                <h3 className="font-semibold md:col-span-5">
                  What are the different ways to manage a state in a React
                  application??
                </h3>
                <p className="md:pl-0 md:col-span-7 text-justify">
                  There are four main types of state you need to properly manage
                  in your React apps: Local state Global state Server state URL
                  state Let's cover each of these in detail: Local (UI) state
                  Local state is data we manage in one or another component.
                  Local state is most often managed in React using the useState
                  hook. For example, local state would be needed to show or hide
                  a modal component or to track values for a form component,
                  such as form submission, when the form is disabled and the
                  values of a form's inputs. Global (UI) state Global state is
                  data we manage across multiple components. Global state is
                  necessary when we want to get and update data anywhere in our
                  app, or in multiple components at least. A common example of
                  global state is authenticated user state. If a user is logged
                  into our app, it is necessary to get and change their data
                  throughout our application. Sometimes state we think should be
                  local might become global. Server state Data that comes from
                  an external server that must be integrated with our UI state.
                  Server state is a simple concept, but can be hard to manage
                  alongside all of our local and global UI state. There are
                  several pieces of state that must be managed every time you
                  fetch or update data from an external server, including
                  loading and error state. Fortunately there are tools such as
                  SWR and React Query that make managing server state much
                  easier. URL state Data that exists on our URLs, including the
                  pathname and query parameters. URL state is often missing as a
                  category of state, but it is an important one. In many cases,
                  a lot of major parts of our application rely upon accessing
                  URL state. Try to imagine building a blog without being able
                  to fetch a post based off of its slug or id that is located in
                  the URL! There are undoubtedly more pieces of state that we
                  could identify, but these are the major categories worth
                  focusing on for most applications you build..
                </p>
              </div>
              <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                <h3 className="font-semibold md:col-span-5">
                  How does prototypical inheritance work?
                </h3>
                <p className="md:pl-0 md:col-span-7 text-justify">
                  JavaScript is a prototype-based, Object Oriented programming
                  language. After the ES6 updates, JavaScript allowed for
                  “prototypal inheritance”, meaning that objects and methods can
                  be shared, extended, and copied.prototypical inheritance
                  refers to the ability to access object properties from another
                  object. We use a JavaScript prototype to add new properties
                  and methods to an existing object constructor. We can then
                  essentially tell our JS code to inherit properties from a
                  prototype. Prototypical inheritance allows us to reuse the
                  properties or methods from one JavaScript object to another
                  through a reference pointer function
                </p>
              </div>
              <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                <h3 className="font-semibold md:col-span-5">
                  What is a unit test? Why should we write unit tests?
                </h3>
                <p className="md:pl-0 md:col-span-7 text-justify">
                  Unit Testing is a type of software testing where individual
                  units or components of a software are tested. The purpose is
                  to validate that each unit of the software code performs as
                  expected. Unit Testing is done during the development (coding
                  phase) of an application by the developers. Unit Tests isolate
                  a section of code and verify its correctness. A unit may be an
                  individual function, method, procedure, module, or object. In
                  SDLC, STLC, V Model, Unit testing is first level of testing
                  done before integration testing. Unit testing is a WhiteBox
                  testing technique that is usually performed by the developer.
                  Though, in a practical world due to time crunch or reluctance
                  of developers to tests, QA engineers also do unit testing.
                </p>
              </div>
              <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                <h3 className="font-semibold md:col-span-5">
                  React vs. Angular vs. Vue?
                </h3>
                <p className="md:pl-0 md:col-span-7 text-justify">
                  Angular, developed by Google, was first released in 2010,
                  making it the oldest of the lot. It is a TypeScript-based
                  JavaScript framework. A substantial shift occurred in 2016 on
                  the release of Angular 2 (and the dropping of the “JS” from
                  the original name AngularJS). Angular 2+ is known as just
                  Angular. Although AngularJS (version 1) still gets updates, we
                  will focus the discussion on Angular.Angular, developed by
                  Google, was first released in 2010, making it the oldest of
                  the lot. It is a TypeScript-based JavaScript framework. A
                  substantial shift occurred in 2016 on the release of Angular 2
                  (and the dropping of the “JS” from the original name
                  AngularJS). Angular 2+ is known as just Angular. Although
                  AngularJS (version 1) still gets updates, we will focus the
                  discussion on Angular.
                  <br />
                  Vue, also known as Vue.js, is the youngest member of the
                  group. It was developed by ex-Google employee Evan You in
                  2014. Over the last several years, Vue has seen a substantial
                  shift in popularity, even though it doesn't have the backing
                  of a large company. The most current version is always
                  announced on the official Vue website on their releases page.
                  Contributors for Vue are supported by Patreon. It should be
                  noted that Vue also has its own GitHub repo, and functions
                  using TypeScript.
                  <br />
                  React, developed by Facebook, was initially released in 2013.
                  Facebook uses React extensively in their products (Facebook,
                  Instagram, and WhatsApp). Similar to Vue, the React developers
                  also announce their newest version on the blog section of the
                  React website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*  */}
      </div>
    </div>
  );
};

export default Blog;
