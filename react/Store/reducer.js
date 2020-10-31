const initialState = {
  examples:[
    {
      title:"MyWebportfolio",url:"https://github.com/ValValeria/React_NodeJs_GraphQL",image:"https://github.com/ValValeria/React_NodeJs_GraphQL/raw/master/screen.png?raw=true",stack:["React","NodeJs","GraphQL"],
    },
    {
      title:"SvgCreator",url:"https://github.com/ValValeria/VueJs_SVGCreator",image:"https://raw.githubusercontent.com/ValValeria/VueJs_SVGCreator/canvas/screen1.png",stack:["VueJs","NodeJs"],
    },
    {
      title:"ReactEmail",image:"https://github.com/ValValeria/React_Email/raw/master/screen.png?raw=true",stack:["React","Redux","NodeJs"],url:"https://github.com/ValValeria/React_Email"
    },
    {
      title:"InDigital",image:"https://github.com/ValValeria/Laravel/raw/master/vuejspng.png",stack:["Laravel","VueJs","Bootstrap"],url:"https://github.com/ValValeria/Laravel"
    }
    ,{
      title:"JSBlog",image:"https://raw.githubusercontent.com/ValValeria/JavaScript_Blog/master/screen2.png",stack:["Angular","NodeJs"],url:"https://github.com/ValValeria/JavaScript_Blog"
    }

  ],
  skills:[
   {
    title:"Angular",description:" открытая и свободная платформа для разработки веб-приложений, написанная на языке TypeScript",image:"/public/images/angular-logo.png"
   },
  {
    title:"React",description:"javaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов",image:"/public/images/react-logo.png"
  },
   {
    title:"NodeJs",description:`программная платформа, превращающая JavaScript из узкоспециализированного языка в язык общего назначения`,image:"/public/images/nodejs_logo.svg"
  },
  {
    title:"PHP",description:"скриптовый язык общего назначения, интенсивно применяемый для разработки веб-приложений",image:"/public/images/php-logo.png"
  },
  ]
};

function rootReducer(state = initialState, action) {
   return state;
};

export default rootReducer;