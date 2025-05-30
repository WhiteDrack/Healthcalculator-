// Calculator definitions with their respective functions
const calculators = [
    { id: "bmi", name: "BMI Calculator", category: "Body Health", icon: "fas fa-calculator", color: "bg-medical-green" },
    { id: "body-fat", name: "Body Fat Calculator", category: "Body Health", icon: "fas fa-percentage", color: "bg-trust-blue" },
    { id: "bmr", name: "BMR Calculator", category: "Body Health", icon: "fas fa-fire", color: "bg-warning-orange" },
    { id: "body-shape", name: "Body Shape Calculator", category: "Body Health", icon: "fas fa-user", color: "bg-purple" },
    { id: "calorie-burn", name: "Calorie Burn Calculator", category: "Nutrition", icon: "fas fa-fire", color: "bg-red" },
    { id: "macro", name: "Macro Calculator", category: "Nutrition", icon: "fas fa-chart-pie", color: "bg-green" },
    { id: "water-intake", name: "Water Intake Calculator", category: "Nutrition", icon: "fas fa-tint", color: "bg-blue" },
    { id: "heart-rate", name: "Heart Rate Calculator", category: "Fitness", icon: "fas fa-heart", color: "bg-red" },
    { id: "vo2-max", name: "VO2 Max Calculator", category: "Fitness", icon: "fas fa-wind", color: "bg-indigo" },
    { id: "sleep", name: "Sleep Calculator", category: "Wellness", icon: "fas fa-moon", color: "bg-indigo" },
    { id: "blood-pressure", name: "Blood Pressure Guide", category: "Wellness", icon: "fas fa-stethoscope", color: "bg-pink" },
    { id: "pregnancy", name: "Pregnancy Calculator", category: "Special", icon: "fas fa-baby", color: "bg-pink" },
    { id: "ideal-weight", name: "Ideal Weight Calculator", category: "Special", icon: "fas fa-weight", color: "bg-teal" },
    { id: "ovulation", name: "Ovulation Calculator", category: "Women's Health", icon: "fas fa-calendar-check", color: "bg-rose" }
];

let selectedCalculator = '';

// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const closeSidebar = document.getElementById('close-sidebar');
const calculatorList = document.getElementById('calculator-list');
const calculatorGrid = document.getElementById('calculator-grid');
const welcomeScreen = document.getElementById('welcome-screen');
const calculatorContainer = document.getElementById('calculator-container');
const selectedCalculatorInfo = document.getElementById('selected-calculator-info');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeGrid();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    menuBtn.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
    
    // Add touch event listeners for better mobile experience
    menuBtn.addEventListener('touchstart', handleTouchStart, { passive: true });
    closeSidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    // Prevent body scroll when sidebar is open on mobile
    document.addEventListener('touchmove', preventBodyScroll, { passive: false });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Touch event handlers for better mobile feedback
function handleTouchStart(e) {
    e.currentTarget.style.transform = 'scale(0.98)';
    setTimeout(() => {
        e.currentTarget.style.transform = '';
    }, 150);
}

// Prevent body scroll when sidebar is open
function preventBodyScroll(e) {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
        e.preventDefault();
    }
}

// Keyboard navigation support
function handleKeyboardNavigation(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebarMenu();
    }
}

// Initialize sidebar with calculator list
function initializeSidebar() {
    calculatorList.innerHTML = '';
    calculators.forEach(calc => {
        const button = document.createElement('button');
        button.className = 'calculator-btn';
        button.dataset.calculator = calc.id;
        button.innerHTML = `
            <i class="${calc.icon} calculator-btn-icon"></i>
            <div class="calculator-btn-text">
                <span class="calculator-name">${calc.name}</span>
                <span class="calculator-category">${calc.category}</span>
            </div>
        `;
        button.addEventListener('click', () => selectCalculator(calc.id));
        calculatorList.appendChild(button);
    });
}

// Initialize calculator grid for welcome screen
function initializeGrid() {
    calculatorGrid.innerHTML = '';
    calculators.forEach(calc => {
        const button = document.createElement('button');
        button.className = 'grid-calculator-btn';
        button.innerHTML = `
            <i class="${calc.icon}"></i>
            <span>${calc.name.replace(' Calculator', '').replace(' Guide', '')}</span>
        `;
        button.addEventListener('click', () => selectCalculator(calc.id));
        calculatorGrid.appendChild(button);
    });
}

// Open sidebar
function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close sidebar
function closeSidebarMenu() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Select and display calculator
function selectCalculator(calculatorId) {
    selectedCalculator = calculatorId;
    const calc = calculators.find(c => c.id === calculatorId);
    
    // Update header info
    selectedCalculatorInfo.textContent = `${calc.category} • ${calc.name}`;
    selectedCalculatorInfo.classList.remove('hidden');
    
    // Update sidebar active state
    document.querySelectorAll('.calculator-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.calculator === calculatorId) {
            btn.classList.add('active');
        }
    });
    
    // Show calculator container and hide welcome screen
    welcomeScreen.classList.add('hidden');
    calculatorContainer.classList.remove('hidden');
    
    // Load the specific calculator
    loadCalculator(calculatorId);
    
    // Close sidebar
    closeSidebarMenu();
}

// Load specific calculator HTML
function loadCalculator(calculatorId) {
    const calc = calculators.find(c => c.id === calculatorId);
    let calculatorHTML = '';
    
    switch(calculatorId) {
        case 'bmi':
            calculatorHTML = createBMICalculator(calc);
            break;
        case 'body-fat':
            calculatorHTML = createBodyFatCalculator(calc);
            break;
        case 'bmr':
            calculatorHTML = createBMRCalculator(calc);
            break;
        case 'body-shape':
            calculatorHTML = createBodyShapeCalculator(calc);
            break;
        case 'calorie-burn':
            calculatorHTML = createCalorieBurnCalculator(calc);
            break;
        case 'macro':
            calculatorHTML = createMacroCalculator(calc);
            break;
        case 'water-intake':
            calculatorHTML = createWaterIntakeCalculator(calc);
            break;
        case 'heart-rate':
            calculatorHTML = createHeartRateCalculator(calc);
            break;
        case 'vo2-max':
            calculatorHTML = createVO2MaxCalculator(calc);
            break;
        case 'sleep':
            calculatorHTML = createSleepCalculator(calc);
            break;
        case 'blood-pressure':
            calculatorHTML = createBloodPressureGuide(calc);
            break;
        case 'pregnancy':
            calculatorHTML = createPregnancyCalculator(calc);
            break;
        case 'ideal-weight':
            calculatorHTML = createIdealWeightCalculator(calc);
            break;
        case 'ovulation':
            calculatorHTML = createOvulationCalculator(calc);
            break;
        default:
            calculatorHTML = '<div class="card"><div class="card-content">Calculator not found</div></div>';
    }
    
    calculatorContainer.innerHTML = calculatorHTML;
    setupCalculatorEvents(calculatorId);
}

// BMI Calculator
function createBMICalculator(calc) {
    return `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-icon ${calc.color}">
                        <i class="${calc.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${calc.name}</h3>
                        <p class="card-description">Check healthy weight status</p>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bmi-height" class="label">Height (cm)</label>
                        <input type="number" id="bmi-height" class="input" placeholder="170">
                        <div class="error-message hidden" id="bmi-height-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bmi-weight" class="label">Weight (kg)</label>
                        <input type="number" id="bmi-weight" class="input" placeholder="70">
                        <div class="error-message hidden" id="bmi-weight-error"></div>
                    </div>
                </div>
                
                <button type="button" class="btn" onclick="calculateBMI()">Calculate BMI</button>
                
                <div id="bmi-result" class="result hidden">
                    <div class="result-value" id="bmi-value"></div>
                    <div class="result-label">Your BMI</div>
                    <div class="result-status" id="bmi-status"></div>
                </div>
            </div>
        </div>
    `;
}

// Body Fat Calculator
function createBodyFatCalculator(calc) {
    return `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-icon ${calc.color}">
                        <i class="${calc.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${calc.name}</h3>
                        <p class="card-description">Approximate body fat percentage</p>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bf-gender" class="label">Gender</label>
                        <select id="bf-gender" class="select">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <div class="error-message hidden" id="bf-gender-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bf-age" class="label">Age</label>
                        <input type="number" id="bf-age" class="input" placeholder="30">
                        <div class="error-message hidden" id="bf-age-error"></div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bf-waist" class="label">Waist (cm)</label>
                        <input type="number" id="bf-waist" class="input" placeholder="85">
                        <div class="error-message hidden" id="bf-waist-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bf-neck" class="label">Neck (cm)</label>
                        <input type="number" id="bf-neck" class="input" placeholder="38">
                        <div class="error-message hidden" id="bf-neck-error"></div>
                    </div>
                </div>
                
                <div class="form-group" id="bf-hip-group" style="display: none;">
                    <label for="bf-hip" class="label">Hip (cm) - Optional for females</label>
                    <input type="number" id="bf-hip" class="input" placeholder="95">
                </div>
                
                <button type="button" class="btn" onclick="calculateBodyFat()">Calculate Body Fat</button>
                
                <div id="bf-result" class="result hidden">
                    <div class="result-value" id="bf-value"></div>
                    <div class="result-label">Body Fat Percentage</div>
                    <div class="result-status status-normal" id="bf-category"></div>
                </div>
            </div>
        </div>
    `;
}

// BMR Calculator
function createBMRCalculator(calc) {
    return `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-icon ${calc.color}">
                        <i class="${calc.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${calc.name}</h3>
                        <p class="card-description">Basal Metabolic Rate</p>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bmr-gender" class="label">Gender</label>
                        <select id="bmr-gender" class="select">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <div class="error-message hidden" id="bmr-gender-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bmr-age" class="label">Age</label>
                        <input type="number" id="bmr-age" class="input" placeholder="30">
                        <div class="error-message hidden" id="bmr-age-error"></div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bmr-height" class="label">Height (cm)</label>
                        <input type="number" id="bmr-height" class="input" placeholder="170">
                        <div class="error-message hidden" id="bmr-height-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bmr-weight" class="label">Weight (kg)</label>
                        <input type="number" id="bmr-weight" class="input" placeholder="70">
                        <div class="error-message hidden" id="bmr-weight-error"></div>
                    </div>
                </div>
                
                <button type="button" class="btn" onclick="calculateBMR()">Calculate BMR</button>
                
                <div id="bmr-result" class="result hidden">
                    <div class="result-value" id="bmr-value"></div>
                    <div class="result-label">Calories per day</div>
                    <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">
                        Calories needed to maintain basic body functions
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Continue with more calculator functions...
function createBodyShapeCalculator(calc) {
    return `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-icon ${calc.color}">
                        <i class="${calc.icon}"></i>
                    </div>
                    <div>
                        <h3 class="card-title">${calc.name}</h3>
                        <p class="card-description">Based on waist-to-hip ratio</p>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="bs-gender" class="label">Gender</label>
                    <select id="bs-gender" class="select">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <div class="error-message hidden" id="bs-gender-error"></div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="bs-waist" class="label">Waist (cm)</label>
                        <input type="number" id="bs-waist" class="input" placeholder="85">
                        <div class="error-message hidden" id="bs-waist-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="bs-hip" class="label">Hip (cm)</label>
                        <input type="number" id="bs-hip" class="input" placeholder="95">
                        <div class="error-message hidden" id="bs-hip-error"></div>
                    </div>
                </div>
                
                <button type="button" class="btn" onclick="calculateBodyShape()">Calculate Body Shape</button>
                
                <div id="bs-result" class="result hidden">
                    <div class="result-value" id="bs-ratio"></div>
                    <div class="result-label">Waist-to-Hip Ratio</div>
                    <div class="result-status" style="background: #9c27b0;" id="bs-shape"></div>
                </div>
            </div>
        </div>
    `;
}

// Add remaining calculator creation functions and calculation logic...

// Calculator logic functions
function calculateBMI() {
    const height = parseFloat(document.getElementById('bmi-height').value);
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    
    // Clear previous errors
    clearErrors(['bmi-height', 'bmi-weight']);
    
    let hasErrors = false;
    
    if (!height || height <= 0) {
        showError('bmi-height', 'Please enter a valid height');
        hasErrors = true;
    }
    
    if (!weight || weight <= 0) {
        showError('bmi-weight', 'Please enter a valid weight');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let status = '';
    let statusClass = '';
    
    if (bmi < 18.5) {
        status = 'Underweight';
        statusClass = 'status-underweight';
    } else if (bmi < 25) {
        status = 'Normal Weight';
        statusClass = 'status-normal';
    } else if (bmi < 30) {
        status = 'Overweight';
        statusClass = 'status-overweight';
    } else {
        status = 'Obese';
        statusClass = 'status-obese';
    }
    
    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    const statusElement = document.getElementById('bmi-status');
    statusElement.textContent = status;
    statusElement.className = `result-status ${statusClass}`;
    document.getElementById('bmi-result').classList.remove('hidden');
}

function calculateBodyFat() {
    const gender = document.getElementById('bf-gender').value;
    const age = parseFloat(document.getElementById('bf-age').value);
    const waist = parseFloat(document.getElementById('bf-waist').value);
    const neck = parseFloat(document.getElementById('bf-neck').value);
    const hip = parseFloat(document.getElementById('bf-hip').value) || 0;
    
    clearErrors(['bf-gender', 'bf-age', 'bf-waist', 'bf-neck']);
    
    let hasErrors = false;
    
    if (!gender) {
        showError('bf-gender', 'Please select gender');
        hasErrors = true;
    }
    if (!age || age <= 0) {
        showError('bf-age', 'Please enter a valid age');
        hasErrors = true;
    }
    if (!waist || waist <= 0) {
        showError('bf-waist', 'Please enter a valid waist measurement');
        hasErrors = true;
    }
    if (!neck || neck <= 0) {
        showError('bf-neck', 'Please enter a valid neck measurement');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    let bodyFat;
    if (gender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(175)) - 450;
    } else {
        const hipValue = hip || waist + 10;
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hipValue - neck) + 0.22100 * Math.log10(165)) - 450;
    }
    
    let category = '';
    if (gender === 'male') {
        if (bodyFat < 6) category = 'Essential Fat';
        else if (bodyFat < 14) category = 'Athletic';
        else if (bodyFat < 18) category = 'Fitness';
        else if (bodyFat < 25) category = 'Average';
        else category = 'Obese';
    } else {
        if (bodyFat < 14) category = 'Essential Fat';
        else if (bodyFat < 21) category = 'Athletic';
        else if (bodyFat < 25) category = 'Fitness';
        else if (bodyFat < 32) category = 'Average';
        else category = 'Obese';
    }
    
    document.getElementById('bf-value').textContent = Math.abs(bodyFat).toFixed(1) + '%';
    document.getElementById('bf-category').textContent = category;
    document.getElementById('bf-result').classList.remove('hidden');
}

function calculateBMR() {
    const gender = document.getElementById('bmr-gender').value;
    const age = parseFloat(document.getElementById('bmr-age').value);
    const height = parseFloat(document.getElementById('bmr-height').value);
    const weight = parseFloat(document.getElementById('bmr-weight').value);
    
    clearErrors(['bmr-gender', 'bmr-age', 'bmr-height', 'bmr-weight']);
    
    let hasErrors = false;
    
    if (!gender) {
        showError('bmr-gender', 'Please select gender');
        hasErrors = true;
    }
    if (!age || age <= 0) {
        showError('bmr-age', 'Please enter a valid age');
        hasErrors = true;
    }
    if (!height || height <= 0) {
        showError('bmr-height', 'Please enter a valid height');
        hasErrors = true;
    }
    if (!weight || weight <= 0) {
        showError('bmr-weight', 'Please enter a valid weight');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    document.getElementById('bmr-value').textContent = Math.round(bmr).toLocaleString();
    document.getElementById('bmr-result').classList.remove('hidden');
}

function calculateBodyShape() {
    const gender = document.getElementById('bs-gender').value;
    const waist = parseFloat(document.getElementById('bs-waist').value);
    const hip = parseFloat(document.getElementById('bs-hip').value);
    
    clearErrors(['bs-gender', 'bs-waist', 'bs-hip']);
    
    let hasErrors = false;
    
    if (!gender) {
        showError('bs-gender', 'Please select gender');
        hasErrors = true;
    }
    if (!waist || waist <= 0) {
        showError('bs-waist', 'Please enter a valid waist measurement');
        hasErrors = true;
    }
    if (!hip || hip <= 0) {
        showError('bs-hip', 'Please enter a valid hip measurement');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    const ratio = waist / hip;
    let shape = '';
    
    if (gender === 'female') {
        if (ratio < 0.8) shape = 'Pear Shape';
        else if (ratio < 0.85) shape = 'Hourglass';
        else shape = 'Apple Shape';
    } else {
        if (ratio < 0.85) shape = 'Lower Body';
        else if (ratio < 0.9) shape = 'Balanced';
        else shape = 'Upper Body';
    }
    
    document.getElementById('bs-ratio').textContent = ratio.toFixed(2);
    document.getElementById('bs-shape').textContent = shape;
    document.getElementById('bs-result').classList.remove('hidden');
}

// Helper functions
function setupCalculatorEvents(calculatorId) {
    // Setup specific events for each calculator
    if (calculatorId === 'body-fat') {
        const genderSelect = document.getElementById('bf-gender');
        const hipGroup = document.getElementById('bf-hip-group');
        
        genderSelect.addEventListener('change', function() {
            if (this.value === 'female') {
                hipGroup.style.display = 'block';
            } else {
                hipGroup.style.display = 'none';
            }
        });
    }
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearErrors(fieldIds) {
    fieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (field) field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.add('hidden');
        }
    });
}

// Add placeholder functions for other calculators
function createCalorieBurnCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Calorie Burn Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createMacroCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Macro Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createWaterIntakeCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Water Intake Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createHeartRateCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Heart Rate Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createVO2MaxCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>VO2 Max Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createSleepCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Sleep Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createBloodPressureGuide(calc) {
    return `<div class="card"><div class="card-content"><h3>Blood Pressure Guide</h3><p>Coming soon...</p></div></div>`;
}

function createPregnancyCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Pregnancy Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createIdealWeightCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Ideal Weight Calculator</h3><p>Coming soon...</p></div></div>`;
}

function createOvulationCalculator(calc) {
    return `<div class="card"><div class="card-content"><h3>Ovulation Calculator</h3><p>Coming soon...</p></div></div>`;
}