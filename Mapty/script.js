'use strict';

class Workout{
    date = new Date();
    id = (Date.now() + '').slice(-10);
    // clicks = 0;
    constructor(distance,duration,coords) {
        this.coords = coords; // [lat,lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
    // click(){
    //     return this.clicks++;
    // }
}
    
class Cycling extends Workout{
    type = 'cycling';
    constructor(distance,duration,coords,elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    // km/min
     calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class Running extends Workout{
    type = 'running';
    constructor(distance,duration,coords,cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    // min/km
    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

// const run1 = new Running(5.2, 32, [23, -22], 178);
// const cycling1 = new Cycling(14, 25, [23, -12], 378);
// console.log(run1,cycling1);

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const updateBtn = document.querySelector('.update_btn');
let formType = document.querySelector('input[name="new_form"]');

// APPLICATION ARCHITECTURE
class App{
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workout = [];

    constructor() {
        // get current position
        this._getPosition();

        // get local storage
        this._getLocalStorage();

        // Event handlers
        inputType.addEventListener('change', this._toggleElevationField);
            
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // console.log('submit happen.');
            this._newWorkout();
            // this._updateForm()
        }.bind(this));
        
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        containerWorkouts.addEventListener('dblclick', this._updateWorkout.bind(this));
    }
   
    _getPosition(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position')
            });
        }
    }
    _loadMap(position) {
        const { latitude,longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude, longitude];
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        // Handling click on map
        this.#map.on('click', function(mapE){
            this._showForm(mapE);
            formType.value = 'new';
        }.bind(this));

         this.#workout.forEach(work => {
            this._randerList(work);
            this._randerWorkoutMarker(work);
        });
    }
    _showForm(mapE) {
        mapE && (this.#mapEvent = mapE);
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    _hideForm() {
        // EMPTY INPUT
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }
    _toggleElevationField() { 
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    }
    _validInputs(...inputs){return inputs.every(inp => Number.isFinite(inp))};
    _allPositive(...inputs){return inputs.every(inp => inp > 0)};
    _newWorkout() {        
        if (document.querySelector('input[name="new_form"]').value !== 'new') {
            return; 
        }
        // Get data from form
        const type = inputType.value;
        const duration = +inputDuration.value;
        const distance = +inputDistance.value;        
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;
        // if workout running, create running object
        if (type === "running") {
            const cadence = +inputCadence.value;
            // Check if data is valid
            // if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)) alert("Inputs have to be positive numbers");
            if (!this._validInputs(duration,distance,cadence) || !this._allPositive(duration,distance,cadence)) return alert("Inputs have to be positive numbers");
            workout = new Running(distance, duration, [lat, lng], cadence);
        }

        // if workout cycling, create cycling object
        if (type == "cycling") {
            const elevation = +inputElevation.value;
            // Check if data is valid
            if (!this._validInputs(duration,distance,elevation) || !this._allPositive(duration,distance)) alert("Inputs have to be positive numbers");  
            workout = new Cycling(distance, duration, [lat, lng], elevation);
        }
        // Add new object to workout array
        this.#workout.push(workout);

        // Rander workout on map as marker
        this._randerWorkoutMarker(workout); 

        // Rander workout list
        this._randerList(workout);

        // show form
        this._hideForm();

        // set local storage
        this._setLocalStorage();
    }

    _randerWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
                // content: workout.distance,
            }))
            .setPopupContent(`${workout.type === "running" ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup(); 
    }

    _randerList(workout) {
        let html = `
        <div class="workout workout--${workout.type}" data-id=${workout.id}>
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === "running" ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>              
        `;

        if (workout.type === 'running') {
            html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace}</span>
                    <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
                </div>
            </div>
        `   
        }
        if (workout.type === 'cycling') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
        </div>
        `
        }
        form.insertAdjacentHTML('afterend', html);
    };

    // Move to marker
    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        const workout = this.#workout.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            }
        });
    }

    // update functionality
    #workEl;
    _updateWorkout(e) {
        this._hideForm();
         this._showForm();
        formType.value = 'update';
        const workoutEl = e.target.closest('.workout');
        if (!workoutEl) return;
        this.#workEl = workoutEl;

        const workoutK = this.#workout.find(work => work.id === workoutEl.dataset.id);
         if (workoutK.type === "cycling") {
            if (inputType.value === 'running') this._toggleElevationField();
            inputType.value = workoutK.type;
            inputElevation.value = workoutK.elevationGain;
         }
         if (workoutK.type === "running") {
             if (inputType.value === 'cycling') this._toggleElevationField();
             inputType.value = workoutK.type;
             inputCadence.value = workoutK.cadence;
         }
        inputDistance.value = workoutK.distance;
        inputDuration.value = workoutK.duration;
        form.addEventListener('submit', this._updateFormSubmit.bind(this,workoutK));
    }

    _removeWorkoutOnList() {
        this.#workEl.remove();
    }

    _updateFormSubmit(workoutK) {
        console.log('this keyword 11>>',this);
        console.log("workout object 22>>",workoutK);
        // console.log("workout Element 33>>",workoutEl);
        const duration = +inputDuration.value;
        const distance = +inputDistance.value;
        const type = inputType.value;
        console.log(duration,distance,type);
        function setDescription() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            workoutK.description = `${workoutK.type[0].toUpperCase()}${workoutK.type.slice(1)} on ${months[new Date(workoutK.date).getMonth()]} ${new Date(workoutK.date).getDate()}`;
            return workoutK.description;
        }
        if (type === 'running') { // Running
            workoutK.elevationGain && delete workoutK.elevationGain;
            workoutK.speed && delete workoutK.speed;
            const cadence = +inputCadence.value;
            function calcPace(){
                workoutK.pace = workoutK.duration / workoutK.distance;
                return workoutK.pace;
            };
            console.log(this._validInputs(duration, distance, cadence));
            console.log(this._allPositive(duration, distance, cadence));
            if (!this._validInputs(duration, distance, cadence) || !this._allPositive(duration, distance, cadence))
            {
                console.log("problem occure");
                 alert("Inputs have to be positive numbers");
                return;
            }
            workoutK.cadence = cadence;
            workoutK.pace = calcPace();
        }
        if (type === "cycling") { // cycling
            workoutK.cadence && delete workoutK.cadence
            workoutK.pace && delete workoutK.pace;
            const elevation = +inputElevation.value;
            if ((!this._validInputs(duration, distance, elevation)) || (!this._allPositive(duration, distance))) 
                {
                console.log("problem occure");
                alert("Inputs have to be positive numbers");
                return;
            };
            workoutK.elevationGain = elevation;
            function calcSpeed(){
                workoutK.speed = workoutK.distance / (workoutK.duration / 60);
                return workoutK.speed;
            }
            workoutK.speed = calcSpeed();
        }
        workoutK.duration = duration;
        workoutK.distance = distance;
        workoutK.type = type;
        // console.log(workoutEl);
        // workoutEl.style.backgroundColor = "red";
        workoutK.description = setDescription();
        this._hideForm();
        // workoutEl.remove(); 
        // Randerin work on display
        this._randerWorkoutMarker(workoutK); 
        this._randerList(workoutK);
        console.log(workoutK);
        this._setLocalStorage();

        this._removeWorkoutOnList();
    };
    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workout));
    };

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));
        if (!data) return;
        this.#workout = data;
        // this.#workout.forEach(work => {
        //     this._randerList(work);
        // });
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
   
}

const app = new App();