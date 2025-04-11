const actions = ['+', '-', '*', '/', '.', '%'];

const dashboard = document.getElementById("dashboard");

function printAction(val) {
  if (val === '+/-') {
    let firstDigit = dashboard.value[0];
    if (firstDigit === '-') {
      dashboard.value = dashboard.value.slice(1);
    } else {
      dashboard.value = '-' + dashboard.value;
    }
  } else {
    const lastChar = dashboard.value[dashboard.value.length - 1];
    if (actions.includes(lastChar) && actions.includes(val)) {
      return;
    }

    if (dashboard.value.length === 0 && actions.includes(val)) {
      return;
    }

    dashboard.value += val;
  }
}

function printDigit(val) {
  dashboard.value += val
}

function solve() {
  let expression = dashboard.value
  dashboard.value = math.evaluate(expression)
}

function clr() {
  dashboard.value = ''
}

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.querySelector('body').className = themeName;
}

function toggleTheme() {
  let theme = localStorage.getItem('theme');

  if (theme === 'theme-second') {
    theme = 'theme-one'
  } else if (theme === 'theme-one') {
    theme = 'theme-second'
  }
  setTimeout(() => {
    setTheme(theme);
  }, 500)
}

function save() {
  localStorage.setItem('result', dashboard.value);
}

function paste() {
  printDigit(localStorage.getItem('result'))
}


setTheme('theme-one');
