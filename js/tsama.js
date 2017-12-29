let myTsamagotchi;

const DEFAULT_NAME = "Tsama";
const DEFAULT_FOOD_LIMIT = 100;

function createTsamagotchi(name, foodLimit)
{
    if (typeof name == 'undefined') name = DEFAULT_NAME;
    if (typeof foodLimit == 'undefined') foodLimit = DEFAULT_FOOD_LIMIT;
    
    myTsamagotchi = new tsama.Tsamagotchi(name, foodLimit);
    saveTsamagotchi(myTsamagotchi);
    
    return myTsamagotchi;
}

function saveTsamagotchi(yourTsamagotchi)
{
    if (typeof Storage !== 'undefined')
    {
        localStorage.tsamagotchi = JSON.stringify(yourTsamagotchi);
    }
    else
    {
        throw new Error("LocalStorage not supported.")
    }
}

function loadTsamagotchi()
{
    if (typeof Storage !== 'undefined')
    {
        let yourTsamagotchiString = localStorage.tsamagotchi;
        
        if (yourTsamagotchiString != 'undefined')
        {
            try
            {
            let yourTsamagotchiDO = JSON.parse(yourTsamagotchiString);
            let yourTsamagotchi = new tsama.Tsamagotchi();
            
            yourTsamagotchi.name = yourTsamagotchiDO.name;
            yourTsamagotchi._age = yourTsamagotchiDO._age;
            yourTsamagotchi._birthdate = new Date(yourTsamagotchiDO._birthdate);
            yourTsamagotchi._health = yourTsamagotchiDO._health;
            yourTsamagotchi._satiety = yourTsamagotchiDO._satiety;
            yourTsamagotchi._happiness = yourTsamagotchiDO._happiness;
            yourTsamagotchi._isAlive = yourTsamagotchiDO._isAlive;
            yourTsamagotchi._foodLimit = yourTsamagotchi._foodLimit;
            
            return yourTsamagotchi;
            } catch (error)
            {
                return createTsamagotchi();
            }
        }
        
        return new tsama.Tsamagotchi(DEFAULT_NAME, DEFAULT_FOOD_LIMIT);
    }
    else
    {
        createTsamagotchi("Cutie");
    }
}

var app = new Vue({
  el: '#tsama-app-container',
  data: {
    tsama: loadTsamagotchi(),
    maxBarWidth: 260,
    images : {
        "happy1": "img/happy-1.png",
        "happy2": "img/happy-2.png",
        "sad1": "img/sad-1.png",
        "sad2": "img/sad-2.png",
        "mad1": "img/mad-1.png",
        "mad2": "img/mad-2.png",
        "dead": "img/dead.png"
    },
    imgToggle: false
  },
  methods: {
      newTsama : function ()
      {
          this.tsama = createTsamagotchi();
      },
      healthWidth : function()
      {
          let toReturn = this.tsama.health / 100 * this.maxBarWidth;
          if (toReturn > this.maxBarWidth) return this.maxBarWidth;
          return toReturn;
      },
      satietyWidth : function()
      {
          let toReturn = this.tsama.satiety / 100 * this.maxBarWidth;
          if (toReturn > this.maxBarWidth) return this.maxBarWidth;
          return toReturn;
      },
      happinessWidth : function()
      {
          let toReturn = this.tsama.happiness / 100 * this.maxBarWidth;
          if (toReturn > this.maxBarWidth) return this.maxBarWidth;
          return toReturn;
      },
      currentImage : function()
      {
          if (this.tsama.isAlive)
          {
              if (this.tsama.health < 50) 
              {
                  if (this.imgToggle) return this.images["sad1"];
                  return this.images["sad2]"];
              }
              if (this.tsama.happiness < 50 || this.tsama.satiety < 50)
              {
                  if (this.imgToggle) return this.images["mad1"];
                  return this.images["mad2"];
              }
              
              if (this.imgToggle) return this.images["happy1"];
              return this.images["happy2"];
          }
          return this.images["dead"];
      }
  }
});



app.tsama.mature();

setInterval(function() {
    app.tsama.mature();
    saveTsamagotchi(app.tsama);
}, 5000);

setInterval(function() {
    app.imgToggle = !app.imgToggle;
}, 1000);
