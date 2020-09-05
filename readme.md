## Workshop Rest in Practice

In order to execute the moment of practice quickly and effectively, participants must Fork this repository for their accounts, clone and test the 2 projects that are here.

- quarkus-order
- request-spring

You will need to perform a simple test on each project to validate them.

**quarkus orders**

> $ cd order-quarkus
>
> $ ./mvnw quarkus: dev

This command should take that initial application.

To validate, we must access the following URL in the browser.

> http: // localhost: 8080 / order

You should return a json something like this:

``` json
[
 {
  "id": "5f346cb5ef47a34fc1df94df",
  "amount": 1,
  "client": "nicolas",
  "dateCreation": "2020-08-12",
  "pending": true,
  "product": "straw",
  "value": 10.00
 }
]
```

**spring-orders**

> $ cd order-quarkus
>
> $ ./mvnw spring-boot: run

This command should take that initial application.

To validate, we must access the following URL in the browser.

> http: // localhost: 8080 / order

A text should look something like this:

```
is runnig
```
