# [general-calendar](https://github.com/leesipeng/general-calendar) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/leesipeng/general-calendar/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/leesipeng/general-calendar/issues)

general-calendar is a calendar core.

## Examples

We have several examples [on the website](https://github.com/leesipeng/general-calendar). Here is the first one to get you started:

```jsx
var oMonth = new GeneralCalendar({
                startDate: '2018-04-12',
                endDate: '2018-05-17',
            });

var months = oMonth.getTotal();
```

This example will return array with date Objects, forexample.
```jsx
months = [
    {
        dates: [
            {
                date: "2018-04-01",
                day: "01",
                disabled: true,
                enabled: undefined,
                isNextMonth: true,
                month: "04",
                week: "日",
                weekday: 0,
                year: "2018"
            }
            {
                date: "2018-04-02",
                day: "02",
                disabled: true,
                enabled: undefined,
                isNextMonth: true,
                month: "04",
                week: "一",
                weekday: 1,
                year: "2018"
            }
        ],
        title: "2018-04"
    }
]
```

## Installation

general-calendar is available as the `react` package on [npm](https://www.npmjs.com/). 

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/leesipeng/general-calendar/issues) that contain bugs which have a relatively limited scope. This is a great place to get started.

### License

general-calendar is [MIT licensed](./LICENSE).
