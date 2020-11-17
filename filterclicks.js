const fs = require('fs')
const {orderBy} = require('natural-orderby')

const generatePeriod = (value) => {
    let h = new Date(Date.parse(value['timestamp']));
    value['period'] = parseFloat(h.getFullYear() + "" + h.getMonth() + "" + h.getDate() + "" + h.getHours())
    return value
}

const removeDuplicate = (clicks, field) => {
    let check = new Set();
    return clicks.filter(element => !check.has(element[field]) && check.add(element[field]));
}

function filtering (fileName) {
    try {
        let filtered = []
        let fileContents = fs.readFileSync(fileName, 'utf8');
        const data = JSON.parse(fileContents);
        removeDuplicate(data, 'ip').forEach(element => {
                let sortedClicks = orderBy(
                    data.filter(e => RegExp(element.ip, 'i').test(e.ip)).map(generatePeriod),
                    [v => v.amount, v => v.timestamp],
                    ['desc', 'asc']
                )
                if (sortedClicks.length >= 10) return
                filtered.push(removeDuplicate(sortedClicks, 'period').map((elem) => {
                    delete elem.period
                    return elem
                }));
            }
        );
        return JSON.stringify([].concat.apply([], filtered))
    } catch (err) {
        console.error('Process file error: ' + err)
    }
}
if(process.argv[2]){
    let data = filtering(process.argv[2])
    fs.writeFileSync('resultset.json', data);
    console.log(data)
}
module.exports = filtering
