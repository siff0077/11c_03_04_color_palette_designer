"use strict"

window.addEventListener("load", init);

const html = [];


function init() {

    getInputs();
  document.querySelector("#input").addEventListener("change", getInputs);
  document.querySelector("#selectedBaseColor").addEventListener("input", getInputs);
}


function getInputs(){
    selectHarmony();
    const hex = hexInput();
    hexToHSL(hex);
}

function hexInput(){
    const hex = document.querySelector("#selectedBaseColor").value;
    return hex;
}

function selectHarmony() {
    html.selectedHarmony = document.querySelector("select").value;
}

function hexToHSL(hex){
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb);

    displayHarmony(hsl);
}

function displayHEX() {
//Displays HEX by inseting it into the #hex with textContent
  const displayHEXCode = "HEX: " + hex;
  document.querySelector("#hex").textContent = displayHEXCode;
}

function hexToRGB(hex) {
    const hexToR = hex.substring(1, 3);
    const hexToG = hex.substring(3, 5);
    const hexToB = hex.substring(5, 7);

    const r = parseInt(hexToR, 16);
    const g = parseInt(hexToG, 16);
    const b = parseInt(hexToB, 16);
    
    return { r, g, b };
}

function displayHarmony(hsl) {
    let harmony = null;
  console.log(hsl);
  if (html.selectedHarmony === "analogous") {
    harmony = calculateAnalogous(hsl);
  } else if (html.selectedHarmony === "monochromatic")
    harmony = calculateMonochromatic(hsl);
  else if (html.selectedHarmony === "triad") {
    harmony = calculateTriad(hsl);
  } else if (html.selectedHarmony === "complementary") {
    harmony = calculateComplementary(hsl);
  } else if (html.selectedHarmony === "compound") {
    harmony = calculateCompound(hsl);
  } else if (html.selectedHarmony === "shades") {
    harmony = calculateShades(hsl);
  }
  console.log(harmony);
  reconvert(harmony);
}

function calculateAnalogous(hsl) {
    let hslArray = new Array(5);
    let hValue = -40;
    for (let increment = 0; increment < 5; increment++) {
        hslArray[increment] = {h: hsl.h + hValue, s: hsl.s, l: hsl.l};
        hValue += 20;
        return hslArray
    }
}

function calculateMonochromatic(hsl) {
    let hslArray = new Array(5);

    hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l + 10 };
    hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l + 20 };
    hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l + 30 };
    hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l + 40 };
    hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l + 50 };
  
    return hslArray;
}

function calculateTriad(hsl) {
    let hslArray = new Array(5);

    hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
    hslArray[1] = { h: hsl.h + 60, s: hsl.s, l: hsl.l + 10 };
    hslArray[2] = { h: hsl.h + 120, s: hsl.s, l: hsl.l + 20 };
    hslArray[3] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };
    hslArray[4] = { h: hsl.h + 140, s: hsl.s, l: hsl.l + 20 };
  
    return hslArray;
}

function calculateComplementary(hsl) {
    let hslArray = new Array(5);

    hslArray[0] = { h: hsl.h + 270, s: hsl.s, l: hsl.l };
    hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
    hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l };
    hslArray[3] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
    hslArray[4] = { h: hsl.h + 270, s: hsl.s, l: hsl.l };

    return hslArray;
}

function calculateCompound(hsl) {
    let hslArray = new Array(5);

    hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
    hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
    hslArray[2] = { h: hsl.h - 20, s: hsl.s, l: hsl.l };
    hslArray[3] = { h: hsl.h + 20, s: hsl.s, l: hsl.l };
    hslArray[4] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };

    return hslArray;
}

function calculateShades(hsl) {
    let hslArray = new Array(5);

    hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l - 5 };
    hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l - 10 };
    hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l - 15 };
    hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l - 20 };
    hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l - 25 };

    return hslArray;
}

function reconvert(harmony) {
    console.log(harmony);
  for (let increment = 0; increment < 5; increment++) {
    const hsl = harmony[increment];
    const rgb = hslToRGB(hsl);
    const hex = rgbToHEX(rgb);
    displayText(hsl, rgb, hex, increment);
  }
}

function displayText(hsl, rgb, hex, increment) {
    displayColor(hex, increment);
    displayHEX(hex, increment);
    displayHSL(hsl, increment);
    displayRGB(rgb, increment);
  }

  function rgbToHSL(rgb) {

  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Number(h.toFixed(0));
  s = Number(s.toFixed(0));
  l = Number(l.toFixed(0));

  
    return { h, s, l };
  }

  function hslToRGB(hsl) {
    let h = hsl.h;
    let s = hsl.s / 100;
    let l = hsl.l / 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return { r, g, b };
  }

  function rgbToHEX(rgb) {
    const hexR = rgb.r.toString(16).padStart(2, "0");
    const hexG = rgb.g.toString(16).padStart(2, "0");
    const hexB = rgb.b.toString(16).padStart(2, "0");
  
    const hex = "#" + hexR + hexG + hexB;
  
    return hex;
  }


  function displayHEX(hex, increment) {
    document.querySelector(`#colorbox${increment} #hex`).textContent = hex;
    console.log(increment);
    console.log(hex);
  }
  
  function displayHSL(hsl, increment) {
    document.querySelector(
      `#colorbox${increment} #hsl`
    ).textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
  }
  
  function displayRGB(rgb, increment) {
    document.querySelector(
      `#colorbox${increment}  #rgb`
    ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
  }
  
  function displayColor(hex, increment) {
    document.querySelector(`#colorbox${increment} .color`).style.backgroundColor = hex;
  }

















  

/* function delegator() {
  //Defines input and hex("waits" for return value), then calls displayHEX
  const input = document.querySelector("input");
  const hex = getInput(input.value);
  displayHEX(hex);
  randomBackground(hex);

  //Defines rgb("waits" for return value), then calls displayRGB
  const rgb = hexToRGB(hex);
  displayRGB(rgb);

  //Defines hsl("waits" for return value), then calls displayHSL
  const hsl = rgbToHSL(rgb);
  displayHSL(hsl);
}

function getInput() {
  //Defines input, and returns that value to 'delegator'
  const input = document.querySelector("input").value;
  return input;
}

function hexToRGB(hex) {
  //Defines RGB values and returns dem to 'delegator'
  let r = parseInt(hex.substring(1, 3), 16); 
  let g = parseInt(hex.substring(3, 5), 16); 
  let b = parseInt(hex.substring(5, 7), 16); 

  console.log(r, g, b);
  return { r, g, b };
}

function rgbToHSL(rgb) {
  //converts RGB to HSL and defines the HSL values, then returns them to 'delegator'
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }
  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

// amount of decimal is getting shortened to 2 and output is inserset to html
  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  

  return { h, s, l };
}


function randomBackground(hex){
    //Makes the box the same color/value, as chosen by the user
    document.querySelector("body").style.backgroundColor = `${hex}`;
}


function displayHEX(hex) {
  //Displays HEX by inseting it into the #hex with textContent
  const displayHEXCode = "HEX: " + hex;
  document.querySelector("#hex").textContent = displayHEXCode;
}


function displayRGB(rgb) {
  
   //Displays RGB by inseting it into the #hex with textContent
  const displayRBGCode = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
  document.querySelector("#rgb").textContent = displayRBGCode;
}


function displayHSL(hsl) {
  
   //Displays HSL by inseting it into the #hex with textContent
  const displayHSLCode = `HSL: ${hsl.h}, ${hsl.s}, ${hsl.s}`;
  document.querySelector("#hsl").textContent = displayHSLCode;
}

 */