import projects from './data.js';

const tabList = document.querySelector('.tab-list');
const sidebarList = document.querySelector('.sidebar-list');
const cardContainer = document.querySelector('.card-container');

let state = {
  stage: '2021q3',
  task: 'CV',
};

/* Dark theme */
const darkMode = document.querySelector('.dark-mode');
const logo = document.querySelector('.logo');
const root = document.documentElement;
let isDark = false;

const variables = {
  '--background-color': ['#36393F', '#fff'],
  '--font-color': ['#B9BBBE', '#6A7480'],
  '--bar-color': ['#2F3136', '#F2F3F5'],
  '--border-color': ['#36393F', '#E3E5E8'],
  '--github-color': ['#B9BBBE', '#6A7480'],
  '--github-hover-color': ['#DCDDDE', '#2E3338'],
  '--active-color': ['#202225', '#D4D7DD'],
  '--active-font-color': ['#DCDDDE', '#2E3338'],
  '--hover-color': ['#2a2c30', '#E8EAED'], 
}

darkMode.addEventListener('click', () => {
  isDark = !isDark;
  darkMode.classList.toggle('dark');
  logo.classList.toggle('dark');
  createCards();
  for (let key in variables) {
    if(isDark) {
      root.style.setProperty(key, variables[key][0]);
    } else {
      root.style.setProperty(key, variables[key][1]);
    }
  }
});

function createTabs() {
  tabList.innerHTML = '';
  projects[state.stage].taskList.forEach((el, index) => {
    const li = document.createElement('li');
    li.classList.add('tab-item');
    if(index === 0) {
      li.classList.add('active');
    }
    const a = document.createElement('a');
    a.classList.add('tab-link');
    a.href = el.link;
    a.target = '_blank';
    a.textContent = el.name;
    li.append(a);
    tabList.append(li);
  });
}
createTabs();

function createSkills() {
  const skills = document.createElement('div');
  skills.classList.add('skill');
  projects[state.stage][state.task].skills.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add(el);
    div.textContent = el;
    skills.append(div);
  });
  return skills;
}

function createCards() {
  cardContainer.innerHTML = '';
  projects[state.stage][state.task].tasks.forEach((el, index) => {
    const card = document.createElement('a');
    card.href = el.link;
    card.target = '_blank';
    card.classList.add('card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    cardImage.style.backgroundImage = `url("assets/img/${state.stage}/${state.task}/${index}_result.webp")`;
    card.append(cardImage);

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description');

    const github = document.createElement('a');
    if(el.github && el.github !== "team") {
      github.href = `https://github.com/${el.github}`;
      github.target = '_blank';
    }
    github.classList.add('github');
    if(isDark) {
      github.classList.add('dark');
    }
    github.textContent = el.github;
    cardDescription.append(github);

    const skills = createSkills();
    cardDescription.append(skills);
    card.append(cardDescription);
    cardContainer.append(card);
  });
}
createCards();

sidebarList.addEventListener('click', function (event) {
  if (event.target.closest('.sidebar-item') && state.stage !== event.target.textContent) {
    document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    state.stage = event.target.textContent;
    state.task = projects[event.target.textContent].taskList[0].name;
    createTabs();
    createCards();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});

tabList.addEventListener('click', function (event) {
  if (event.target.closest('.tab-item') && state.task !== event.target.textContent) {
    event.preventDefault();
    document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    state.task = event.target.textContent;
    createCards();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});