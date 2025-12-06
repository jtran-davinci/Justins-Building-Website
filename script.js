var PartDatabase;

var budgetInput = document.querySelector(".budget");
var allParts = document.getElementById("allParts");
var budgetOverlay = document.getElementById("budgetOverlay");
var testButton = document.getElementById("testButton");

// Budget Input
var Budget = null;
var AvailableBudget = null;
var Total = 0;

// Audio Variables
var InstallAudio = false;
// FPS Texts
var ValorantText = document.getElementById("valorantFPS");
var RobloxText = document.getElementById("robloxFPS");
var FortniteText = document.getElementById("fortniteFPS");
var CyberpunkText = document.getElementById("cyberpunkFPS");

// Buttons
var caseButton = document.getElementById("caseButton");
var motherboardButton = document.getElementById("motherboardButton");
var cpuButton = document.getElementById("cpuButton");
var cpuCoolerButton = document.getElementById("cpuCoolerButton");
var ramButton = document.getElementById("ramButton");
var ssdButton = document.getElementById("ssdButton");
var psuButton = document.getElementById("psuButton");
var gpuButton = document.getElementById("gpuButton");

// Part Boxes
var caseBox = document.getElementById("caseBox");
var motherboardBox = document.getElementById("motherboardBox");
var cpuBox = document.getElementById("cpuBox");
var cpuCoolerBox = document.getElementById("cpuCoolerBox");
var ramBox = document.getElementById("ramBox");
var ssdBox = document.getElementById("ssdBox");
var psuBox = document.getElementById("psuBox");
var gpuBox = document.getElementById("gpuBox");

// Part Template
var partTemplate = document.getElementById("part-template");

var PromptOverlay = document.getElementById("prompt-overlay");
var PromptContent = document.getElementById("prompt-content");
var ResultsContent = document.getElementById("results-content");
var PromptPartContainer = document.getElementById("part-container");
var PromptTitle = document.getElementById("prompt-title");
var PromptDesc = document.getElementById("prompt-desc");

// Games CPU & GPU ratio
var gamesRatios = {
  valorant: {
    cpu: 0.3,
    gpu: 0.7,
    referenceScore: 23747,
    standardFPS: 237,
  },
  roblox: {
    cpu: 0.4,
    gpu: 0.6,
    referenceScore: 23747,
    standardFPS: 95,
  },
  fortnite: {
    cpu: 0.4,
    gpu: 0.6,
    referenceScore: 23747,
    standardFPS: 86,
  },
  cyberpunk: {
    cpu: 0.2,
    gpu: 0.8,
    referenceScore: 23747,
    standardFPS: 10,
  },
};
// Sounds
var sounds = {
  hover: "sounds/ui/hover.mp3",
  leave: "sounds/ui/leave.mp3",
  click: "sounds/ui/click.mp3",
  yay: "sounds/ui/yay.mp3",
};

var installSounds = {
  cpu: "sounds/parts/cpu-install.mp3",
  cpuCooler: "sounds/parts/cpucooler-install.mp3",
  gpu: "sounds/parts/gpu-install.mp3",
  motherboard: "sounds/parts/motherboard-install.mp3",
  case: "sounds/parts/pc-case.mp3",
  psu: "sounds/parts/psu-install.mp3",
  ram: "sounds/parts/ram-install.mp3",
  ssd: "sounds/parts/ssd-install.mp3",
};

// Matrix Configuration of PC
var ConfigLimits = {
  caseSize: null,
  gpuMaxSize: null,
  moboSize: null,
  memoryType: null,
  socket: null,
  memory: null,
  cpuScore: null,
  gpuScore: null,
  wattageNeeded: null,
};

// Part Variables
var PartList = {
  case: null,
  motherboard: null,
  cpu: null,
  cpuCooler: null,
  ram: null,
  ssd: null,
  gpu: null,
  psu: null,
  prices: {
    case: 0,
    motherboard: 0,
    cpu: 0,
    cpuCooler: 0,
    ram: 0,
    ssd: 0,
    gpu: 0,
    psu: 0,
  },
};

fetch("partDatabase.json")
  .then((res) => res.json())
  .then((partDB) => {
    PartDatabase = partDB;
  });

budgetInput.addEventListener("input", () => {
  updatePrice(budgetInput.value);
});

function updatePrice(budgetValue) {
  if (budgetValue) {
    if (budgetValue > 627.94) {
      Budget = Number(budgetValue);
      AvailableBudget = Number(budgetValue);
      allParts.setAttribute("class", "parts primary scrollable");
      budgetOverlay.classList.add("fade-out");
      checkSelection();
    } else {
      document.getElementById("budgetText").textContent =
        "Enter a higher budget to avoid running out of money";
      allParts.setAttribute("class", "parts primary no-scroll");
      budgetOverlay.setAttribute("class", "parts-overlay");
    }
  } else {
    document.getElementById("budgetText").textContent =
      "Please enter a budget to continue";
    allParts.setAttribute("class", "parts primary no-scroll");
    budgetOverlay.setAttribute("class", "parts-overlay");
  }
}

function checkCompatibility(category, partUi) {
  if (category.category == "Motherboard Size") {
    if (ConfigLimits.caseSize == "miniITX") {
      if (
        category.limit == "microATX" ||
        category.limit == "ATX" ||
        category.limit == "E-ATX"
      ) {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    } else if (ConfigLimits.caseSize == "microATX") {
      if (category.limit == "ATX" || category.limit == "E-ATX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    } else if (ConfigLimits.caseSize == "ATX") {
      if (category.limit == "E-ATX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Motherboard Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    }
  } else if (category.category == "Socket Type") {
    if (ConfigLimits.socket != category.limit) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incorrect Socket Type";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "Memory Type") {
    if (ConfigLimits.memoryType != category.limit) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incompatible Memory";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "GPU Length") {
    if (
      Number(ConfigLimits.gpuMaxSize) <= Number(category.limit.slice(0, -2))
    ) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Incompatible GPU Size";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "Wattage") {
    if (
      Number(ConfigLimits.wattageNeeded) >= Number(category.limit.slice(0, -1))
    ) {
      partUi.querySelector(".incompatible-overlay").classList.remove("hidden");
      partUi.classList.add("push-to-bottom");
      partUi.querySelector(".incompatible-overlay p").textContent =
        "Insufficient Power";
      partUi.querySelector(".part-select").disabled = true;
    }
  } else if (category.category == "Form Factor") {
    if (ConfigLimits.caseSize == "miniITX") {
      if (category.limit == "ATX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    } else if (ConfigLimits.caseSize == "ATX") {
      if (category.limit == "SFX") {
        partUi
          .querySelector(".incompatible-overlay")
          .classList.remove("hidden");
        partUi.classList.add("push-to-bottom");
        partUi.querySelector(".incompatible-overlay p").textContent =
          "Incompatible Size";
        partUi.querySelector(".part-select").disabled = true;
      }
    }
  }
}

function updateTotalPrice() {
  let sum = 0;

  for (let key in PartList.prices) {
    sum += PartList.prices[key];
  }
  AvailableBudget = Budget - sum;
  document.getElementById("TotalPrice").textContent = "$" + sum.toFixed(2);
}

function checkSelection() {
  if (PartList.case != null) {
    caseButton.textContent = "Change Component";
    caseButton.disabled = false;
    caseBox.setAttribute("class", "part-box");
  } else {
    caseButton.textContent = "Select Component";
    caseButton.disabled = false;
    caseBox.setAttribute("class", "part-box");
  }

  if (PartList.motherboard != null) {
    motherboardButton.textContent = "Change Component";
    motherboardButton.disabled = false;
    motherboardBox.setAttribute("class", "part-box");
  } else {
    if (PartList.case != null) {
      motherboardButton.textContent = "Select Component";
      motherboardButton.disabled = false;
      motherboardBox.setAttribute("class", "part-box");
    } else {
      motherboardButton.textContent = "Select Component";
      motherboardButton.disabled = true;
      motherboardBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.cpu != null) {
    cpuButton.textContent = "Change Component";
    cpuButton.disabled = false;
    cpuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.motherboard != null) {
      cpuButton.textContent = "Select Component";
      cpuButton.disabled = false;
      cpuBox.setAttribute("class", "part-box");
    } else {
      cpuButton.textContent = "Select Component";
      cpuButton.disabled = true;
      cpuBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.cpuCooler != null) {
    cpuCoolerButton.textContent = "Change Component";
    cpuCoolerButton.disabled = false;
    cpuCoolerBox.setAttribute("class", "part-box");
  } else {
    if (PartList.cpu != null) {
      cpuCoolerButton.textContent = "Select Component";
      cpuCoolerButton.disabled = false;
      cpuCoolerBox.setAttribute("class", "part-box");
    } else {
      cpuCoolerButton.textContent = "Select Component";
      cpuCoolerButton.disabled = true;
      cpuCoolerBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.ram != null) {
    ramButton.textContent = "Change Component";
    ramButton.disabled = false;
    ramBox.setAttribute("class", "part-box");
  } else {
    if (PartList.cpuCooler != null) {
      ramButton.textContent = "Select Component";
      ramButton.disabled = false;
      ramBox.setAttribute("class", "part-box");
    } else {
      ramButton.textContent = "Select Component";
      ramButton.disabled = true;
      ramBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.ssd != null) {
    ssdButton.textContent = "Change Component";
    ssdButton.disabled = false;
    ssdBox.setAttribute("class", "part-box");
  } else {
    if (PartList.ram != null) {
      ssdButton.textContent = "Select Component";
      ssdButton.disabled = false;
      ssdBox.setAttribute("class", "part-box");
    } else {
      ssdButton.textContent = "Select Component";
      ssdButton.disabled = true;
      ssdBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.gpu != null) {
    gpuButton.textContent = "Change Component";
    gpuButton.disabled = false;
    gpuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.ssd != null) {
      gpuButton.textContent = "Select Component";
      gpuButton.disabled = false;
      gpuBox.setAttribute("class", "part-box");
    } else {
      gpuButton.textContent = "Select Component";
      gpuButton.disabled = true;
      gpuBox.setAttribute("class", "part-box blurout");
    }
  }

  if (PartList.psu != null) {
    psuButton.textContent = "Change Component";
    psuButton.disabled = false;
    psuBox.setAttribute("class", "part-box");
  } else {
    if (PartList.gpu != null) {
      psuButton.textContent = "Select Component";
      psuButton.disabled = false;
      psuBox.setAttribute("class", "part-box");
    } else {
      psuButton.textContent = "Select Component";
      psuButton.disabled = true;
      psuBox.setAttribute("class", "part-box blurout");
    }
  }
}

function loadPrompt(part) {
  AvailableBudget += PartList.prices[part];
  PartList.prices[part] = 0;
  PromptTitle.textContent = part.charAt(0).toUpperCase() + part.slice(1);
  for (let individualpart in PartDatabase[part]) {
    let Part = PartDatabase[part][individualpart];

    var NewPart = partTemplate.cloneNode(true);
    NewPart.setAttribute("class", "individual-part primary");
    PromptPartContainer.appendChild(NewPart);

    NewPart.querySelector(".part-info h1").textContent = Part.name;
    NewPart.querySelector(".part-info p").textContent = Part.desc;
    NewPart.querySelector(".part-image").src = Part.path;
    NewPart.querySelector(".part-select").textContent = "$" + Part.price;

    const priceBtn = NewPart.querySelector(".part-select");
    priceBtn.addEventListener("click", () => {
      selectPart(part, Part);
    });

    // Loop limits
    for (let limitId in Part.limits) {
      var limit = Part.limits[limitId];
      var CategoryLimit = NewPart.querySelector(
        ".part-individual-category"
      ).cloneNode(true);
      CategoryLimit.querySelector("h1").textContent = limit.category;
      CategoryLimit.querySelector("p").textContent = limit.limit;
      CategoryLimit.classList.remove("hidden");
      NewPart.querySelector(".part-s-categories").appendChild(CategoryLimit);

      var MobileCategory = NewPart.querySelector(
        ".part-mobile-individual-category"
      ).cloneNode(true);

      MobileCategory.querySelector("h1").textContent = limit.category;
      MobileCategory.querySelector("p").textContent = limit.limit;
      MobileCategory.classList.remove("hidden");

      NewPart.querySelector(".part-row2 .part-s-categories").appendChild(
        MobileCategory
      );

      checkCompatibility(limit, NewPart);
    }

    if (Part.price > AvailableBudget) {
      NewPart.querySelector(".incompatible-overlay").classList.remove("hidden");
      NewPart.querySelector(".incompatible-overlay p").textContent =
        "Out of Budget";
      NewPart.querySelector(".part-select").disabled = true;
    }
  }
  PromptOverlay.classList.add("show");
  PromptContent.classList.remove("hidden");
  ResultsContent.classList.add("hidden");
  attachButtonSounds();
}

function closePrompt() {
  PromptOverlay.classList.remove("show");
  [...PromptPartContainer.children].forEach((child) => {
    if (child !== partTemplate) {
      child.remove();
    }
  });
}

function getFPSfromScore(gameScore, referenceScore, standardFPS) {
  var FPS = (gameScore / referenceScore) * standardFPS;
  return "~" + Math.trunc(FPS) + " FPS";
}

function rateScore(score) {
  var result = document.getElementById("resultText");
  result.classList.remove("green", "okay", "bad", "terrible");

  var ratingText = "";
  var ratingClass = "";

  if (score >= 70000) {
    ratingText = "Good";
    ratingClass = "green";
  } else if (score >= 50000) {
    ratingText = "Mediocre";
    ratingClass = "okay";
  } else if (score >= 30000) {
    ratingText = "Bad";
    ratingClass = "bad";
  } else {
    ratingText = "Terrible";
    ratingClass = "terrible";
  }

  result.textContent = ratingText;
  result.classList.add(ratingClass);
}

function loadResults() {
  PromptOverlay.classList.add("show");
  ResultsContent.classList.remove("hidden");
  PromptContent.classList.add("hidden");

  valorantScore =
    ConfigLimits.gpuScore * gamesRatios.valorant.gpu +
    ConfigLimits.cpuScore * gamesRatios.valorant.cpu;

  robloxScore =
    ConfigLimits.gpuScore * gamesRatios.roblox.gpu +
    ConfigLimits.cpuScore * gamesRatios.roblox.cpu;

  fortniteScore =
    ConfigLimits.gpuScore * gamesRatios.fortnite.gpu +
    ConfigLimits.cpuScore * gamesRatios.fortnite.cpu;

  cyberpunkScore =
    ConfigLimits.gpuScore * gamesRatios.cyberpunk.gpu +
    ConfigLimits.cpuScore * gamesRatios.cyberpunk.cpu;

  ValorantText.textContent = getFPSfromScore(
    valorantScore,
    gamesRatios.valorant.referenceScore,
    gamesRatios.valorant.standardFPS
  );

  RobloxText.textContent = getFPSfromScore(
    robloxScore,
    gamesRatios.roblox.referenceScore,
    gamesRatios.roblox.standardFPS
  );

  FortniteText.textContent = getFPSfromScore(
    fortniteScore,
    gamesRatios.fortnite.referenceScore,
    gamesRatios.fortnite.standardFPS
  );

  CyberpunkText.textContent = getFPSfromScore(
    cyberpunkScore,
    gamesRatios.cyberpunk.referenceScore,
    gamesRatios.cyberpunk.standardFPS
  );

  rateScore(ConfigLimits.gpuScore + ConfigLimits.cpuScore);
  playSound(sounds.yay, false);
}

function selectPart(category, part) {
  // Deletes old parts from previous selection
  [...document.getElementById(category + "Texts").children].forEach((child) => {
    if (
      child !== document.getElementById(category + "Title") &&
      child !== document.getElementById(category + "Desc")
    ) {
      child.remove();
    }
  });

  PartList[category] = part.name;
  document.getElementById(category + "Title").textContent = part.name;
  document.getElementById(category + "Img").src = part.path;
  var Price = document.createElement("h3");
  Price.textContent = "Price: $" + part.price;
  document.getElementById(category + "Texts").appendChild(Price);
  PartList.prices[category] = part.price;

  if (category == "cpu") {
    ConfigLimits.cpuScore = part.score;
  } else if (category == "gpu") {
    ConfigLimits.gpuScore = part.score;
  }

  for (let limitId in part.limits) {
    var limit = part.limits[limitId];
    var Text = document.createElement("h3");
    Text.textContent = limit.category + ": " + limit.limit;
    document.getElementById(category + "Texts").appendChild(Text);

    if (limit.category === "Case Size") {
      ConfigLimits.caseSize = limit.limit;
    } else if (limit.category === "Socket") {
      ConfigLimits.socket = limit.limit;
    } else if (limit.category === "Memory") {
      ConfigLimits.memoryType = limit.limit;
    } else if (limit.category === "GPU Size Limit") {
      ConfigLimits.gpuMaxSize = limit.limit.slice(0, -2);
    } else if (limit.category === "Power Consumption") {
      ConfigLimits.wattageNeeded = limit.limit.slice(0, -1);
    }
  }
  document.getElementById(category + "Desc").classList.add("hidden");

  if (category == "psu") {
    testButton.disabled = false;
  }

  updateTotalPrice();
  playSound(installSounds[category], true);
  closePrompt();
  checkSelection();
}

function playSound(src, partbeinginstalled) {
  var audio = new Audio(src);

  if (partbeinginstalled) {
    InstallAudio = true;
  } else {
    if (InstallAudio) {
      audio.volume = 0.07;
    } else {
      audio.volume = 1;
    }
  }

  audio.play();

  audio.addEventListener("ended", function () {
    if (partbeinginstalled) {
      InstallAudio = false;
    }
  });
}

function attachButtonSounds() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.onmouseenter = () => {
      if (!btn.disabled) {
        playSound(sounds.hover, false);
      }
    };

    btn.onmouseleave = () => {
      if (!btn.disabled) {
        playSound(sounds.leave, false);
      }
    };

    btn.onmousedown = () => {
      if (!btn.disabled) {
        playSound(sounds.click, false);
      }
    };
  });
}

attachButtonSounds();
