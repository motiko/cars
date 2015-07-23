/*eslint */
/*global angular*/

angular.module('app', []);

angular.module('app').controller('MainCtrl', MainCtrl);

function MainCtrl($http) {
    this.orderBy = 'pos';
    this.selectedContinent = "";
    this.cars = [];
    this.sumPrice = 0;
    this.showOnlyAsians = localStorage.getItem('showOnlyAsians') ?
                JSON.parse(localStorage.getItem('showOnlyAsians')) : false;
    this.showOnlyAmerican = localStorage.getItem('showOnlyAmerican') ?
                JSON.parse(localStorage.getItem('showOnlyAmerican')) : false;

    this.showAsian = function(){
        var show = this.showOnlyAsians;
        if(show){
            this.showOnlyAmerican = false;
            this.selectedContinent = "Asia";
        }else{
            this.selectedContinent = "";
        }
        this.saveState();
    };

    this.showAmerican = function(){
        var show = this.showOnlyAmerican;
        if(show){
            this.showOnlyAsians = false;
            this.selectedContinent = "America";
        }else{
            this.selectedContinent = "";
        }
        this.saveState();
    };

    this.saveState = function(){
        localStorage.setItem('showOnlyAsians', JSON.stringify(this.showOnlyAsians) );
        localStorage.setItem('showOnlyAmerican', JSON.stringify(this.showOnlyAmerican) );
    };

    this.fetchCars = function(){
        var that = this;
        $http.get('/api/cars')
            .success(function(cars){
                that.cars = cars;
            });
    };

    this.initContinentFilter = function(){
        if(this.showOnlyAsians){
            this.selectedContinent = "Asia";
        }
        if(this.showOnlyAmerican){
            this.selectedContinent = "America";
        }
    };

    this.init = function(){
        this.initContinentFilter();
        this.fetchCars();
    }

    this.init();

    
}

function filterCars(cars, continent){
    if(!continent || continent === ''){
        return cars;
    }
    return cars.filter( function(car){
        return car.continent === continent;
    });
}

angular.module('app').filter('byContinent', function() {
  return filterCars;
});

angular.module('app').filter('sumByContinent', function() {
  return function(cars, continent) {
    var filteredCars = filterCars(cars, continent);
    return filteredCars.reduce(function(sum, cur){
        return sum + cur.price;
    }, 0);

  };

});


