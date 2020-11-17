# filtering

`filtering()` will process an array of clicks to determine which ones are fulfilling the following criteria:

- For each IP within each one hour period, only the most expensive click is placed into the result set.
- If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
- If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.

This process will result in a file called `resultset.json` containing all those clicks according to the given criteria.

## Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Reference](#api-reference)
---
## Getting Started

Install required libraries
```bash
# npm
npm install
```

## Usage

Process a file containing an array of clicks with the following format:
<!-- prettier-ignore -->
```json
[
 { "ip":"22.22.22.22", "timestamp":"3/11/2020 02:02:58", "amount": 7.00 }
]
```

```bash
# npm
npm run solution <jsonfile.json>
```
This command will process the json file a parameter and will result in a file called `resultset.json`.

This package also contains a set of test that could be easily running with the following command:
```bash
# npm
npm run test
```


## API Reference

### `filtering()`

`filtering()` uses `natural-orderby` that sorts primitive values as well as [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects and also can order the result set using more than one criteria.
This particularly allows us to not just sort clicks based on the most expensive amount but also from the earliest click to the latest in case more than one of them have the same amount for the same period.

#### Syntax

<!-- prettier-ignore -->
```javascript
filtering<T>(fileName: String<T>):Array<T>
```

#### Description

`filtering()` receives a JSON filename and initially determines a set of unique IP to iterate through them.
For every unique IP gets all clicks from the file and initially generates a period defined as the one hour spans that start at the top of the hour.

```text
00:00:00 00:59:59 (period 1)
01:00:00 01:59:59 (period 2)
02:00:00 02:59:59 (period 3)
```
The format of this period is determined by concatenate `year`,`month`,`date` and `hour` from the original timestamp, and it’s been temporarily stored in the result set.

<!-- prettier-ignore -->
```json
[
 { "ip":"22.22.22.22", "timestamp":"3/11/2020 02:02:58", "amount": 7.00, "period": 202011302 }
]
```


Next it orders the set of clicks from the most expensive one to the cheapest but also from the earliest to the latest. This way it covers the situation where more than one click has the same amount on the same period of time, which will be the first record after the `orderBy()` method call.

The last step in this process would be to remove all the duplicated clicks based on the period of time generated. Basically what it does is keep the first record and remove the ones that follow.


