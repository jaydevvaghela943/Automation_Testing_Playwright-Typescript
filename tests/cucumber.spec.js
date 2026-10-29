
/*

Cucumber: lets you write automated tests in plain language

Cucumber is a tool for running automated acceptance tests,
written in plain language. Because they're written in plain language,
they can be read by anyone on your team, improving communication, collaboration and trust.

Example : 

1) Test 1 : Eating too much of anything may not be good for you
-Scenario: Eating a few is no problem
-Given: Alice is hungry
-When: She eat 3 cucumbers
-Then: she will be full

Install : npm install @cucumber/cucumber
VS Editor : Cucumber (Gherkin) Full Support : install Extention
Github : https://github.com/cucumber/cucumber-js

Gherkin:
Gherkin is a set of grammar rules that makes plain text structured enough for Cucumber to understand.

Create folder : features/steps/steps.js
* divide whole test into one senario in (When,Then,Given) and variable make is public (this), So easily access
* When('Add {string} to cart', async function(product) { : variable pass as {string} and access as function parameter name
* Create browser and page on it because it can not access directly

--------------RUN Cucumber----------------
Command : 
- npx cucumber-js
- npx cucumber-js --exit
- also run headless mode

------------------Run Specific file----------------------
- npx cucumber-js features/ErrorValidation.feature --exit

-------------Hooks In Cucumber--------------
 2 parameter here : 1: step title 2: function
Used to call in each senario it work like Playwright hooks like beforeALl, BeforeEach etc..

Methods
===============
Before, After, AfterAll, BeforeAll

Tags Hooks
==============
In above method we can use name and tag in senario : We can run specific tag senario
Example : BeforeStep({tags: "@Validation" | "@Regression and @xxx" | "@foo or @xxx"} or BeforeStep({name: "foo"}
--------------RUN Cucumber----------------
- npx cucumber-js --tags "@Regression" --exit  : Run all Regression test cases


-------------------Parameterization, Parallel, html and re-Run failed tests-----
- Scenario Outline : Here Outline means we can pass parameter as variable in feature file and dynamic pass single or multiple parameter (Examples)
- Command : npx cucumber-js --tags @Validation --exit

--------------Cucumber Feature(File)------------------------
- We can add multiple scenario in one file and run it
- We can run multiple file at same time
- We can run muitiple scenario based on tags
- example : --parallel 2 (senario)

Command : npx cucumber-js features/Ecommerce.feature --parallel 2 --exit

-----Generate Report
Command : npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

-----Script Command----
- We can add script command on package.json script tag and run this tag direct
*/
