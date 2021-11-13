import moment from 'moment'

const PLACEHOLDER_DIGIT = '0'

/* make Agreements object from raw Agreements */
export function agreementsObjFromRaw(raw_agrs) {
  const items = {}
  raw_agrs.forEach(el => {
    items[el.agreements_id] = el
  })
  return items
}

/* up and summ number data in pack prop obj (structure) */
export function fillStructure(arg, structure, prop = 'pack') {
  const str = JSON.parse(JSON.stringify(structure))
  function pack(arg, str) {
    Object.entries(arg).forEach(el => {
      let lvl = ''
      el[0].split('.').forEach(rss => {
        if (rss) {
          lvl += `${rss}.`
          const t = getStructureFromLevelsV3(str, lvl.split('.'))
          t[1].pack = mergePropSumNumbers(t[1][prop] ?? {}, el[1][prop] ?? {})
        }
      })
      if (el[1].children) {
        pack(el[1].children, str)
      }
    })
  }
  pack(arg, str)
  return str
}

/* превращает иерархию в плоский массив где эл-ты идут в порядке вхождения */
export function getBodyRows(arg) {
  const result = []
  let row = null
  function bodyRows(arg) {
    Object.entries(arg).forEach(rss => {
      if (rss[1].children) {
        row = bodyRows(rss[1].children)
      } else {
        row = rss
      }
      if (row) result.push(row)
    })
  }
  bodyRows(arg)
  return result
}

export function getDate(arg) {
  if (moment(arg, 'YYYY-MM-DD').isValid()) return new Date(moment.utc(arg, 'YYYY-MM-DD').format())
  return arg
}

export function getAdvance({ item, ks, pay }) {
  /*
   * item - сумма итемов договора по условию точного совпадения кода рсс
   * ks - сумма выполненных работ по условию точного совпадения кода рсс
   * pay - сумма платежей по условию точного совпадения кода рсс
   * группы соотв-т уникальным итемам, кс и платежи попадают в группы
   * только при условии совпадения кодов рсс с итемом
   * */
  const diffPay = item - ks + pay
  if (ks - pay <= 0) {
    return item
  } else {
    if (diffPay <= 0) {
      return 0
    }
    return diffPay
  }
}

export function getStructureFromLevelsV3(structure, arg, ind = 0) {
  const key = (index, arg) => {
    // console.log(index, arg)
    let res = ''
    // debugger
    for (let k = 0; k <= index; k++) {
      if (arg[k]) res += arg[k] + '.'
    }
    return res
  }
  let k = key(ind, arg)
  if (structure[k]?.children && arg[ind + 1]) {
    return getStructureFromLevelsV3(structure[k]?.children, arg, ++ind)
  } else if (Number.isInteger(+arg[ind])) {
    return [k, structure[k]]
  } else {
    k = arg[0] + '.'
    return [k, structure[k]]
  }
}

export function hasRSSatStart(el, regex) {
  return el.search(new RegExp(`^${regex}\\s`)) !== -1
}

export function hasRSSatStartV2(el = '', regex = '') {
  return el.search(new RegExp(`^${regex}`, 's')) !== -1
}

export function hasRSSatEnd(el, regex) {
  return el.search(new RegExp(`${regex}$`)) !== -1
}

export function hasRSSatEndV3(el, regex) {
  // console.log(el, regex)
  return el.search(new RegExp(`^${regex}`)) !== -1
}

export function hasRSSatEndV2(el, regex) {
  return el.search(new RegExp(`${regex}$`)) !== -1
}

export function includeRSSatEnd(el, regex) {
  return el.search(new RegExp(`${regex}`)) !== -1
}

export function getRSSatStart(str) {
  return str.substring(0, str.match(/\.\s/)?.index + 1) || 'значение отстуствует'
}

export function reviver(a, b) {
  if (b === null) return 'поле равно null'
  if (b === '') return 'поле пустая строка'
  if (typeof b === 'string') return b.trim()
  return b
}

export function sumArray(arr) {
  let total = 0
  // console.log(arr)
  if (Array.isArray(arr)) {
    arr.forEach(element => {
      total += +element.summa
    })
  }
  return parseInt(total, 10)
}

export function sumArrayOfArrays(arr, index) {
  let total = 0
  if (Array.isArray(arr)) {
    arr.forEach(element => {
      total += +element[index] || 0
    })
  }
  return parseInt(total, 10)
}

export function difference(setA, setB) {
  const _difference = new Set(setA)
  for (const elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

export function intersectArr(a, b) {
  if (!a.length) return b
  if (!b.length) return a
  return a.filter(Set.prototype.has, new Set(b))
}

export function intersection(setA, setB) {
  const _intersection = new Set()
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

export function logObj({ obj, prop }) {
  const arr = []
  const uniqEl = new Set()
  obj.forEach(el => {
    uniqEl.add(el.prop)
    arr.push(el)
  })
  console.log(arr)
  console.log(uniqEl)
}

export function sumArrayOfArraysObj(arr, index, name) {
  let total = 0
  if (Array.isArray(arr)) {
    arr.forEach(element => {
      total += +element[index][name]
    })
  }
  return parseInt(total, 10)
}

export function sumPropObj(obj, prop = 'summa') {
  let total = 0
  Object.values(obj).forEach(element => {
    // console.log(element)
    total += +element[prop]
  })
  return parseInt(total, 10)
}

export function formatDigit(a, _default = PLACEHOLDER_DIGIT) {
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  a = parseInt(a, 10)
  return Number.isInteger(a) && a !== null ? new Intl.NumberFormat('ru-RU').format(a) : _default
}

export function sortArr(arg, tbl) {
  const _sortArr = (a, b) => {
    if (a[arg.column] > b[arg.column]) {
      return arg.order === 'asc' ? 1 : -1
    }
    if (a[arg.column] < b[arg.column]) {
      return arg.order === 'asc' ? -1 : 1
    }
    return 0
  }
  return tbl.sort(_sortArr)
}

export async function my_fetch({ name, arg, url, commit }) {
  console.time(name)
  // console.log(name, arg, url, commit)
  const response = await fetch(url)
  const text = await response.text()
  const json = await JSON.parse(text, reviver)
  // console.log(json)
  console.timeEnd(name)
  commit(name, { data: json.data, arg })
}

export const objFilter = (obj, condition, part = 'value') => {
  let newObj = {}
  for (const [key, value] of Object.entries(obj)) {
    if (condition([part])) {
      newObj = { ...newObj, [key]: value }
    }
  }
  return newObj
}

export function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = reject
    fr.onload = function() {
      resolve(fr.result)
    }
    fr.readAsDataURL(file)
  })
}

export function setFilterData(arg, amounts) {
  const result = []
  // console.log(arg)
  Object.entries(arg).forEach(el => {
    const obj = {}
    obj.id = el[0]
    if (el[1]?.name) obj.label = el[1].name
    obj.amount = amounts[el[0]] || 0
    obj.rss = el[0]
    if (el[1]?.children) {
      obj.children = setFilterData(el[1].children, amounts)
    }
    result.push(obj)
  })
  return result
}

export function getFilter(arg) {
  const result = []
  Object.entries(arg).forEach(el => {
    if (el[0] === 'id') result.push(el[1])
    if (el[0] === 'children') {
      // console.log(el[1])
      el[1].forEach(elCh => {
        result.push(...getFilter(elCh))
      })
    }
  })
  return result
}
/* суммирует и дополняет вышестоящие группы
 * например:
 * 1.1.4.2.: 10,
 * 1.1.1.2.: 15,
 * 2.1.2.: 20,
 * 2.2.1.: 20,
 * 2.2.3.: 20,
 *
 * будет:
 * 1.: 25
 * 1.1.: 25,
 * 1.1.1.: 15,
 * 1.1.1.2.: 10,
 * 1.1.1.4.: 15,
 * 2.: 60,
 * 2.1.: 20,
 * 2.2.: 40,
 * 2.2.1.: 20,
 * 2.2.3.: 20,
 * */

export function makeHierarchyWithAmount(arg) {
  const levels = new Set()
  const res = {}
  Object.keys(arg).forEach(el => {
    // console.log(el)
    let l = ''
    el.split('.')
      .filter(el => el !== '')
      .forEach(lvl => {
        levels.add((l += `${lvl}.`))
      })
  })
  levels.forEach(el => {
    Object.entries(arg).forEach(rss => {
      if (~rss[0].search(`^${el}`) || `${rss[0]}.` === el) {
        res[el] = res[el] ? res[el] + rss[1] : rss[1]
      }
    })
  })
  return res
}

export function makeHierarchyWithAmountV2(arg) {
  const levels = new Set()
  const res = {}
  Object.keys(arg).forEach(el => {
    let l = ''
    el.split('.')
      .filter(el => el !== '')
      .forEach(lvl => {
        levels.add((l += `${lvl}.`))
      })
  })
  levels.forEach(el => {
    Object.entries(arg).forEach(rss => {
      if (~rss[0].search(`^${el.trim()}`) || rss[0] === `${el}.`) {
        // only object allow in a prop
        if (!Number.isNaN(+rss[1])) {
          throw new Error(`${rss[0]} = ${rss[1]} prop not object((`)
        }
        res[el] = res[el] ? mergePropSumNumbers(res[el], rss[1]) : rss[1]
      }
    })
  })
  return res
}

/* суммирует числовые св-ва объектов, св-ва которые не приводятся к целым числам не равным 0 переносятся как есть,
 true переносится как true */
function mergePropSumNumbers(a, b) {
  const result = {}
  Object.entries(a).forEach(el => {
    if (
      typeof +el[1] === 'number' &&
      typeof +b[el[0]] === 'number' &&
      !Number.isNaN(+el[1]) &&
      !Number.isNaN(+b[el[0]])
    ) {
      result[el[0]] ??= parseInt(el[1] || 0, 10)
      result[el[0]] += parseInt(b[el[0]], 10) || 0
    } else {
      result[el[0]] = el[1]
    }
  })
  Object.entries(b).forEach(el => {
    if (!a[el[0]] && a[el[0]] !== null && a[el[0]] !== undefined) {
      if (typeof +b[el[0]] === 'number' && !Number.isNaN(+b[el[0]])) {
        result[el[0]] ??= parseInt(b[el[0]] || 0, 10) || 0
      } else {
        result[el[0]] = el[1]
      }
    } else {
      result[el[0]] ??= el[1]
    }
  })
  return result
}
